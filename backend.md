# FitTrack 後端開發規格文件

## 1. 技術選擇與開發策略

### 1.1 核心技術棧
```
後端框架：Node.js + Express.js
初期資料庫：MongoDB
- 使用 Mongoose ODM
- 本地開發環境
未來遷移目標：Firebase
```

### 1.2 開發策略
1. **第一階段（本地開發）**
   - 使用 MongoDB 進行快速開發和驗證
   - 重點放在功能實現和業務邏輯
   - 本地開發環境，方便除錯

2. **第二階段（Firebase 遷移準備）**
   - 遵循 Firebase 的最佳實踐設計資料結構
   - 撰寫資料遷移腳本
   - 準備測試環境

3. **第三階段（正式遷移）**
   - 將資料遷移至 Firebase
   - 整合 Firebase 認證系統
   - 實現即時同步功能

## 2. Express 專案結構

```
src/
├── config/                 # 配置文件
│   ├── database.js        # 資料庫配置
│   └── server.js          # 服務器配置
│
├── middleware/            # 中間件
│   ├── auth.js           # 認證中間件
│   ├── error.js          # 錯誤處理
│   └── validation.js     # 請求驗證
│
├── routes/               # 路由定義
│   ├── auth.js          # 認證相關路由
│   ├── workouts.js      # 運動相關路由
│   └── user.js          # 使用者相關路由
│
├── controllers/          # 控制器
│   ├── authController.js
│   ├── workoutController.js
│   └── userController.js
│
├── services/            # 業務邏輯
│   ├── authService.js
│   ├── workoutService.js
│   └── userService.js
│
└── app.js              # 應用程式入口點
```

## 3. API 路由規劃

### 3.1 認證相關
```javascript
// 用戶認證
POST   /api/auth/register     # 註冊
POST   /api/auth/login        # 登入
POST   /api/auth/logout       # 登出
```

### 3.2 使用者相關
```javascript
// 用戶資料
GET    /api/user/profile      # 取得個人資料
PUT    /api/user/profile      # 更新個人資料
PUT    /api/user/settings     # 更新設定
```

### 3.3 運動相關
```javascript
// 運動記錄
GET    /api/workouts          # 取得運動列表
POST   /api/workouts          # 新增運動記錄
GET    /api/workouts/:id      # 取得單筆記錄
PUT    /api/workouts/:id      # 更新記錄
DELETE /api/workouts/:id      # 刪除記錄
```

## 4. 開發環境設置

### 4.1 本地開發環境
```bash
# 必要條件
- Node.js 18+
- MongoDB 6+
- MongoDB Compass (建議安裝，用於資料庫視覺化)

# 環境變數設置
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/fittrack
PORT=3000
```

### 4.2 開發工具
- VSCode 推薦擴充功能
  - ESLint
  - Prettier
  - MongoDB for VSCode
- MongoDB Compass 用於資料庫操作和監控

## 5. 資料庫操作策略

### 5.1 MongoDB 最佳實踐
```javascript
// 使用環境變數管理資料庫連接
mongoose.connect(process.env.MONGODB_URL);

// 使用 Mongoose Schema 定義結構
// 為未來遷移到 Firebase 做準備
```

### 5.2 錯誤處理
```javascript
// 全局錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message
  });
});
```

## 6. 未來擴展考慮

### 6.1 Firebase 遷移準備
- 設計通用的資料存取層
- 避免使用 MongoDB 特有功能
- 保持資料結構簡單和扁平化

### 6.2 開發注意事項
1. 使用環境變數管理配置
2. 實作完整的錯誤處理
3. 添加請求驗證
4. 實作日誌記錄
5. 注意 API 響應格式一致性

## 7. 開發流程建議

1. **基礎設置**
   - 建立專案結構
   - 設置開發環境
   - 配置資料庫連接

2. **核心功能實現**
   - 實作認證系統
   - 建立基本 CRUD 操作
   - 添加必要中間件

3. **測試與優化**
   - 編寫單元測試
   - API 端點測試
   - 效能優化

4. **文檔與維護**
   - API 文檔
   - 代碼註釋
   - 錯誤處理文檔
