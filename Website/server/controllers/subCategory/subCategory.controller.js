const subCategory = require('../../models/subCategory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await subCategory.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: subCategory,
    });
});

exports.getAllSubCategories = catchAsync(async (req, res, next) => {
    const subCategories = await subCategory.find({}).populate({
        path: 'category',
        select: 'name slug',
    });

    res.status(200).json({
        status: 'Success',
        reuslt: subCategories.length,
        data: subCategories,
    });
});

exports.getASubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await subCategory.findById(req.params.id).populate({
        path: 'category',
        select: 'name slug',
    });

    if (!subCategory) {
        return next(new AppError('SubCategory not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: subCategory,
    });
});

exports.updateASubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await subCategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    if (!subCategory) {
        return next(new AppError('SubCategory not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: subCategory,
    });
});

exports.deleteASubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await subCategory.findByIdAndRemove(req.params.id);

    if (!subCategory) {
        return next(new AppError('SubCategory not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});
