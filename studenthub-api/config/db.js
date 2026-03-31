// config/db.js
const mysql  = require('mysql2');
require('dotenv').config();

// A pool manages multiple connections efficiently
// Instead of opening/closing a connection per request,
// the pool reuses existing connections
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit:    10,   // max 10 simultaneous connections
  queueLimit:         0,
});

// .promise() lets us use async/await instead of callbacks
const db = pool.promise();

// Test the connection when server starts
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL connected successfully');
  connection.release(); // always release back to pool
});

module.exports = db;