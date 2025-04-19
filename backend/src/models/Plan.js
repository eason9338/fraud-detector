const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '請輸入計畫名稱'],
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '請提供用戶ID']
    },
    
    exercises: [{
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
            required: [true, '請提供運動ID']
        },
    }],

    note: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Plan', planSchema);