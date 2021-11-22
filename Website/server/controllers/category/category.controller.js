const Category = require('../../models/category');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: newCategory,
    });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find({});

    res.status(200).json({
        status: 'Success',
        reuslt: subCategories.length,
        data: categories,
    });
});

exports.getACategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('Category not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
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
        status: 'Success',
        data: category,
    });
});

exports.deleteACategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return next(new AppError('Category not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});
