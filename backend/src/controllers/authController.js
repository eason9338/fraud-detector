const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createToken } = require('../services/utils/jwt');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError(401, 'Invalid email or password');
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // 檢查郵箱是否已被使用
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, 'Email already exists');
    }

    // 加密密碼
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 創建新用戶
    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    // 創建 token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};