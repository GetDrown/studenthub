const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');
const dotenv      = require('dotenv');
const authRoutes  = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'StudentHub API is running.' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

