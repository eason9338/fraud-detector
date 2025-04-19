const express = require('express');
const router = express.Router();

const { createRecord } = require('../controllers/recordServiceController');
const { getRecord, getAllRecord } = require('../controllers/getRecordController');
const { protect } = require('../middleware/jwtAuth');

router.post('/createRecord', protect, createRecord);
router.get('/getRecord/:userId/:date', getRecord);
router.get('/getAllRecord/:userId', getAllRecord);

module.exports = router;