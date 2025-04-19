const express = require('express');
const router = express.Router();

const { createWorkoutPlan, getWorkoutPlan, getWorkoutPlanByUser } = require('../controllers/workoutPlanController');
const { protect } = require('../middleware/jwtAuth');

router.post('/createPlan', protect, createWorkoutPlan);
router.get('/getPlan/:planId', getWorkoutPlan);
router.get('/getPlanByUser/:userId', getWorkoutPlanByUser)

module.exports = router;