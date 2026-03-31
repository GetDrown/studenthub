// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This function runs BEFORE any protected route handler
// It checks if the request carries a valid JWT token
function protect(req, res, next) {
  // Tokens are sent in the Authorization header like:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token. Access denied.' });
  }

  // Extract just the token part after "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using our secret key
    // If it's expired or tampered with, this throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to req so routes can use it
    req.user = decoded; // { id, username, iat, exp }
    next(); // ← pass control to the actual route handler

  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = protect;