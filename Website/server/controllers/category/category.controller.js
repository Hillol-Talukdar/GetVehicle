const Category = require('../../models/category');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
    const doc = await Category.create(req.body);

    res.status(201).json({
        data: doc,
    });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find({});

    res.status(200).json({
        data: categories,
    });
});

exports.getACategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('Category not found!', 404));
    }

    res.status(200).json({
        data: category,
    });
});

exports.updateACategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!category) {
        return next(new AppError('Category not found!', 404));
    }

    res.status(200).json({
        data: category,
    });
});

exports.deleteACategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return next(new AppError('Category not found!', 404));
    }

    res.status(204).json({
        status: 'successful',
    });
});
