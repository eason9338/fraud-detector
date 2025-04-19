const Plan = require('../models/Plan');

exports.createWorkoutPlan = async (req, res, next) => {
    try {
            const { name, exercises} = req.body;

            const formattedExercises = exercises.map((exercise) => ({
                exercise: exercise.id
            }));

            const newPlan = {
                name,
                user: req.user.id,
                exercises: formattedExercises
            }

            const createPlan = await Plan.create(newPlan);

            //populate語法中，第一個參數是Plan中user欄位的參照，name是這個參照內的屬性
            const populatedPlan = await Plan.findById(createPlan._id)
                .populate('user', 'name')
                .populate('exercises.exercise', 'name')

            res.status(201).json({
                success: true,
                data: {
                    record: populatedPlan
                }
            });

    } catch (error){
        next(error)
    }
};

exports.getWorkoutPlan = async (req, res, next) => {
    try {
        const { planId } = req.params;

        const plan = await Plan.find({ _id: planId })
            .populate('exercises.exercise', 'name')

        res.status(200).json({
            success: true,
            data: plan
        })
    } catch (error) {
        next(error);
    }
}

exports.getWorkoutPlanByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const plans = await Plan.find({user: userId})
            .populate('exercises.exercise', 'name')

        res.status(200).json({
            success: true,
            data: plans
        })
    } catch (error) {
        next(error);
    }
}