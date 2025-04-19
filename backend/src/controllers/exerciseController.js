const Exercise = require('../models/Exercise');

exports.getCategories = async (req, res, next) => {
    try {
        const categoryMapping = Exercise.getCategoryMapping();
        const categories = Object.entries(categoryMapping).map(([id, names]) => {
            return {
                id: id,
                en: names.en,
                zh: names.zh
            }
        });

        if (!categories.length) {
            const error = new Error('未找到任何運動類別');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {
        next(error);
    }
}

exports.getExercisesByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const categoryIdNum = parseInt(categoryId)

        // 定義有效的類別
        const validCategories = [1, 2, 3 ,4 ,5 ,6 ,7];
        
        if (!validCategories.includes(categoryIdNum)) {
            const error = new Error('Invalid category: ', categoryIdNum);
            error.status = 400;
            throw error;
        }

        const exercises = await Exercise.find({ categoryId: categoryIdNum })
            .select('name description targetMuscles');

        if (!exercises.length) {
            const error = new Error(`No exercises found in this category: ${categoryIdNum}`);
            error.status = 404;
            throw error;
        }

        const categoryMapping = Exercise.getCategoryMapping();
        const category = categoryMapping[categoryIdNum];

        res.status(200).json({
            success: true,
            count: exercises.length,
            category: {
                id: categoryIdNum,
                nameEn: category.en,
                nameZh: category.zh
            },
            data: exercises,
        });

    } catch (error) {
        next(error);
    }
};