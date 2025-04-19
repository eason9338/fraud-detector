const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, '請提供運動名稱'],
      trim: true,
      unique: true
    },
    categoryId: {  // 改用 categoryId
      type: Number,
      required: [true, '請提供運動類別'],
      enum: [1, 2, 3, 4, 5, 6, 7]  // 1: 胸部, 2: 背部, 3: 肩膀, 4: 手臂, 5: 腿部, 6: 核心, 7: 其他
    },
    description: {
      type: String,
      trim: true
    },
    targetMuscles: [{
      type: String,
      trim: true
    }]
}, {
    timestamps: false
});

// 新增靜態方法來獲取類別對照表
exerciseSchema.statics.getCategoryMapping = function() {
    return {
        1: { en: 'Chest', zh: '胸部' },
        2: { en: 'Back', zh: '背部' },
        3: { en: 'Shoulder', zh: '肩膀' },
        4: { en: 'Arms', zh: '手臂' },
        5: { en: 'Legs', zh: '腿部' },
        6: { en: 'Core', zh: '核心' },
        7: { en: 'Others', zh: '其他' }
    };
};

module.exports = mongoose.model('Exercise', exerciseSchema);