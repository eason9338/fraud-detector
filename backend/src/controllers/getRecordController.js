const Record = require('../models/Record');

exports.getRecord = async (req, res, next) => {
    const { userId, date } = req.params;

    try {
        const startDate = new Date(date);
        const endDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);

        const records = await Record.find({
            user: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })
            .populate('user', 'name')
            .populate('exercises.exercise')
            .sort({ date: -1 });


        res.status(200).json({
            success: true,
            data: records
        })
    } catch (error) {
        next(error);
    }
}

exports.getAllRecord = async (req, res, next) => {
    const{ userId } = req.params;
    try {
        const records = await Record.find({
            user: userId
        })
            .populate('user', 'name')
            .populate('exercises.exercise', 'name')

        res.status(200).json({
            success: true,
            data: records
        })

    } catch (error) {
        next(error)
    }
}