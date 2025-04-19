// seedExercises.js
require('dotenv').config(); // 確保可以讀取 .env 檔案
const connectDB = require('./database'); // 引入你的資料庫連線功能
const Exercise = require('../models/Exercise');

const exercises = [
    // Chest (胸部) exercises
    {
      name: "平板槓鈴臥推",
      categoryId: 1,
      description: "基礎的胸部推舉動作，可以全面刺激胸大肌。",
      targetMuscles: ["胸大肌", "三角肌前束", "肱三頭肌"]
    },
    {
      name: "上斜槓鈴臥推",
      categoryId: 1,
      description: "針對上胸肌群的推舉動作。",
      targetMuscles: ["胸大肌上束", "三角肌前束", "肱三頭肌"]
    },
    {
      name: "下斜槓鈴臥推",
      categoryId: 1,
      description: "針對下胸肌群的推舉動作。",
      targetMuscles: ["胸大肌下束", "肱三頭肌"]
    },
    {
      name: "蝴蝶機夾胸",
      categoryId: 1,
      description: "使用蝴蝶機做夾胸動作，著重於胸肌內側訓練。",
      targetMuscles: ["胸大肌內側"]
    },
    {
      name: "啞鈴飛鳥",
      categoryId: 1,
      description: "側平舉啞鈴訓練胸肌。",
      targetMuscles: ["胸大肌", "三角肌前束"]
    },
    {
      name: "伏地挺身",
      categoryId: 1,
      description: "基礎的徒手胸部訓練動作。",
      targetMuscles: ["胸大肌", "三角肌前束", "肱三頭肌", "核心肌群"]
    },
    // Back (背部) exercises
    {
      name: "引體向上",
      categoryId: 2,
      description: "基礎的背部拉力訓練。",
      targetMuscles: ["背闊肌", "菱形肌", "肱二頭肌"]
    },
    {
      name: "槓鈴划船",
      categoryId: 2,
      description: "彎腰使用槓鈴做划船動作。",
      targetMuscles: ["背闊肌", "菱形肌", "斜方肌", "肱二頭肌"]
    },
    {
      name: "坐姿划船",
      categoryId: 2,
      description: "坐姿使用器材做划船動作。",
      targetMuscles: ["背闊肌", "菱形肌", "肱二頭肌"]
    },
    {
      name: "單手啞鈴划船",
      categoryId: 2,
      description: "單手支撐做划船動作。",
      targetMuscles: ["背闊肌", "菱形肌", "肱二頭肌"]
    },
    {
      name: "高位下拉",
      categoryId: 2,
      description: "使用滑輪下拉訓練背部。",
      targetMuscles: ["背闊肌", "菱形肌", "肱二頭肌"]
    },
    // Shoulder (肩膀) exercises
    {
      name: "槓鈴肩推",
      categoryId: 3,
      description: "基礎的肩部推舉動作。",
      targetMuscles: ["三角肌", "肱三頭肌"]
    },
    {
      name: "啞鈴側平舉",
      categoryId: 3,
      description: "訓練肩部側面肌群。",
      targetMuscles: ["三角肌中束"]
    },
    {
      name: "啞鈴前平舉",
      categoryId: 3,
      description: "訓練肩部前束肌群。",
      targetMuscles: ["三角肌前束"]
    },
    {
      name: "站姿肩推",
      categoryId: 3,
      description: "站立時的肩部推舉動作。",
      targetMuscles: ["三角肌", "肱三頭肌"]
    },
    {
      name: "面拉",
      categoryId: 3,
      description: "訓練後肩與斜方肌。",
      targetMuscles: ["三角肌後束", "斜方肌"]
    },
    // Arms (手臂) exercises
    {
      name: "槓鈴彎舉",
      categoryId: 4,
      description: "訓練二頭肌的基礎動作。",
      targetMuscles: ["肱二頭肌"]
    },
    {
      name: "三頭肌下壓",
      categoryId: 4,
      description: "訓練三頭肌的基礎動作。",
      targetMuscles: ["肱三頭肌"]
    },
    {
      name: "槌式彎舉",
      categoryId: 4,
      description: "以槌式握法訓練手臂。",
      targetMuscles: ["肱二頭肌", "肱橈肌"]
    },
    {
      name: "法式彎舉",
      categoryId: 4,
      description: "訓練三頭肌的變化動作。",
      targetMuscles: ["肱三頭肌"]
    },
    {
      name: "繩索下壓",
      categoryId: 4,
      description: "使用繩索訓練三頭肌。",
      targetMuscles: ["肱三頭肌"]
    },
    // Legs (腿部) exercises
    {
      name: "深蹲",
      categoryId: 5,
      description: "最基礎的腿部複合動作。",
      targetMuscles: ["股四頭肌", "臀大肌", "腿後肌群"]
    },
    {
      name: "硬舉",
      categoryId: 5,
      description: "訓練臀腿後側的複合動作。",
      targetMuscles: ["臀大肌", "腿後肌群", "豎脊肌"]
    },
    {
      name: "腿推",
      categoryId: 5,
      description: "使用腿推機訓練腿部。",
      targetMuscles: ["股四頭肌", "臀大肌"]
    },
    {
      name: "弓步蹲",
      categoryId: 5,
      description: "單腿訓練的複合動作。",
      targetMuscles: ["股四頭肌", "臀大肌", "腿後肌群"]
    },
    {
      name: "腿後彎舉",
      categoryId: 5,
      description: "針對腿後肌群的訓練。",
      targetMuscles: ["腿後肌群"]
    },
    // Core (核心) exercises
    {
      name: "捲腹",
      categoryId: 6,
      description: "基礎的腹部訓練動作。",
      targetMuscles: ["腹直肌"]
    },
    {
      name: "平板支撐",
      categoryId: 6,
      description: "等長收縮核心肌群。",
      targetMuscles: ["腹直肌", "腹外斜肌", "豎脊肌"]
    },
    {
      name: "側平板",
      categoryId: 6,
      description: "訓練側腹肌群。",
      targetMuscles: ["腹外斜肌"]
    },
    {
      name: "仰臥腳舉",
      categoryId: 6,
      description: "訓練下腹部。",
      targetMuscles: ["腹直肌下部"]
    },
    {
      name: "俄羅斯轉體",
      categoryId: 6,
      description: "訓練腹部旋轉力量。",
      targetMuscles: ["腹直肌", "腹外斜肌"]
    },
    // Others (其他) exercises
    {
      name: "負重步行",
      categoryId: 7,
      description: "提升心肺功能的有氧運動。",
      targetMuscles: ["全身性"]
    },
    {
      name: "跳繩",
      categoryId: 7,
      description: "基礎的心肺訓練。",
      targetMuscles: ["小腿肌群", "心肺功能"]
    },
    {
      name: "箱型跳",
      categoryId: 7,
      description: "爆發力訓練。",
      targetMuscles: ["股四頭肌", "小腿肌群"]
    },
    {
      name: "戰繩",
      categoryId: 7,
      description: "高強度心肺訓練。",
      targetMuscles: ["全身性", "心肺功能"]
    },
    {
      name: "壺鈴擺盪",
      categoryId: 7,
      description: "全身性的功能性訓練。",
      targetMuscles: ["臀大肌", "腿後肌群", "核心肌群"]
    },
    // Additional chest exercises
    {
      name: "反向伏地挺身",
      categoryId: 1,
      description: "使用器材做反向伏地挺身，減輕負重。",
      targetMuscles: ["胸大肌", "三角肌前束"]
    },
    // Additional back exercises
    {
      name: "直臂下壓",
      categoryId: 2,
      description: "站姿使用滑輪下壓。",
      targetMuscles: ["背闊肌", "三角肌後束"]
    },
    // Additional shoulder exercises
    {
      name: "上拉聳肩",
      categoryId: 3,
      description: "訓練斜方肌的上升動作。",
      targetMuscles: ["斜方肌"]
    },
    // Additional arms exercises
    {
      name: "反向彎舉",
      categoryId: 4,
      description: "訓練肱二頭肌的變化動作。",
      targetMuscles: ["肱二頭肌"]
    },
    // Additional legs exercises
    {
      name: "分腿蹲",
      categoryId: 5,
      description: "加強髖關節活動度的深蹲變化。",
      targetMuscles: ["股四頭肌", "臀大肌", "內收肌群"]
    },
    // Additional core exercises
    {
      name: "死蟲式",
      categoryId: 6,
      description: "躺臥交替動作訓練核心。",
      targetMuscles: ["腹直肌", "腹外斜肌"]
    },
    // Additional other exercises
    {
      name: "爬繩",
      categoryId: 7,
      description: "上肢與核心的綜合訓練。",
      targetMuscles: ["背闊肌", "肱二頭肌", "核心肌群"]
    }
  ];

const seedDatabase = async () => {
    try {
        // 清空現有資料
        await connectDB()
        await Exercise.deleteMany({});
        
        // 插入新資料
        await Exercise.insertMany(exercises);
        
        console.log('資料庫種子資料建立成功！');
    } catch (error) {
        console.error('資料庫種子資料建立失敗：', error);
    }
};

module.exports = seedDatabase;
// 執行 seeder
seedDatabase();