const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    name: {
      type: String, 
      required: false,
      default: '健身紀錄'
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '請提供用戶ID']
    },

    date: {
      type: Date,
      required: [true, '請提供訓練日期'],
      default: Date.now
    },

    exercises: [{
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: [true, '請提供運動ID']
      },
      
      sets: [{
        weight: {
          type: Number,
          required: [true, '請提供重量'],
          min: [0, '重量不能為負數']
        },
        reps: {
          type: Number,
          required: [true, '請提供次數'],
          min: [1, '次數至少為1']
        }
      }],
    }],
    note: {
      type: String,
      trim: true
    }
}, {
timestamps: false
});

module.exports = mongoose.model('Record', recordSchema);