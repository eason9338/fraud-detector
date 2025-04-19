const mongoose = require('mongoose');

const connectDB = async () => {
  const dev_mode = true;
  const MONGODB_URL = dev_mode ? process.env.MONGODB_URL_LOCAL : process.env.MONGODB_URL
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('MongoDB connected successfully on: ', MONGODB_URL);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
