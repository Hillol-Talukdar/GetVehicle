const Category = require('../../models/category');
const catchAsync = require('../../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
    const doc = await Category.create(req.body);

    res.status(201).json({
        data: doc,
    });
});
