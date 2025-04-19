const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '請提供電子郵件'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '請提供有效的電子郵件']
  },
  password: {
    type: String,
    required: [true, '請提供密碼'],
    minlength: [6, '密碼至少需要6個字符']
  },
  name: {
    type: String,
    required: [true, '請提供姓名'],
    trim: true,
    minlength: [2, '姓名至少需要2個字符']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true // 自動管理 createdAt 和 updatedAt
});

// 索引設置
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);