const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes (will create these next)
const authRoutes = require('../routes/auth');
const exerciseRoutes = require('../routes/exercise');
const recordRoutes = require('../routes/record');
const planRoutes = require('../routes/plan');
// const userRoutes = require('../routes/user');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('=== 請求資訊 ===');
  console.log('時間:', new Date().toISOString());
  console.log('方法:', req.method);
  console.log('路徑:', req.path);
  console.log('請求頭:', req.headers);
  console.log('請求體:', req.body);
  console.log('===============');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/record', recordRoutes);
app.use('/api/plan', planRoutes);
// app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;