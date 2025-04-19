const express = require('express');
const router = express.Router();
const { getExercisesByCategory, getCategories } = require('../controllers/exerciseController');

router.get('/category/:categoryId', getExercisesByCategory);
router.get('/categories', getCategories);

module.exports = router;