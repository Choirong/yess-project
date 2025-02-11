const express = require('express');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/doc');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결 설정
const MONGODB_URI = 'mongodb://localhost:27017/yess-project';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/doc', authenticateToken, docRoutes); // API 인증 추가

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;