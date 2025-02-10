const express = require('express');
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/doc');

// dotenv.config({ path: path.join(__dirname, "../.env.local") });

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결 설정
const MONGODB_URI = 'mongodb://localhost:27017/yess_project';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/doc', docRoutes);

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