const Record = require('../models/Record');
const moment = require('moment-timezone');

exports.createRecord = async (req, res, next) => {
    try {
        const { name, exercises } = req.body
        const userId = req.user.id
        const currentDate = new Date(
            new Date().getTime() + (8 * 60 * 60 * 1000)
        );

        const formattedExercises = exercises.map((exercise) => ({
            exercise: exercise.id,
            sets: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps
            }))
        }));

        const newRecord = {
            user: userId,
            date: currentDate,  
            name,
            exercises: formattedExercises
        }

        const createdRecord = await Record.create(newRecord);

        const populatedRecord = await Record.findById(createdRecord._id)
            .populate('user', 'name')
            .populate('exercises.exercise', 'name');

        res.status(201).json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteRecord = async (req, res, next) => {
    
}