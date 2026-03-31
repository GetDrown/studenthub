// routes/auth.js
const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const db       = require('../config/db');
require('dotenv').config();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Step 1: Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Step 2: Find the user in the database
    const [rows] = await db.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]  // ? prevents SQL injection
    );

    if (rows.length === 0) {
      // Don't specify "user not found" — keep error vague for security
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = rows[0];

    // Step 3: Compare submitted password with hashed password in DB
    // bcrypt.compare() hashes the input and compares — never decrypts
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Step 4: Create a JWT token
    // The token contains the user's ID and username (payload)
    // It's signed with our secret key so it can't be faked
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES } // token expires in 8 hours
    );

    // Step 5: Send token back to the client
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user.id, username: user.username },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;