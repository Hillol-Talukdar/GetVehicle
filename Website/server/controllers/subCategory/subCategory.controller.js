const SubCategory = require('../../models/subCategory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: subCategory,
    });
});

exports.getAllSubCategories = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find({}).populate({
        path: 'category',
        select: 'name slug',
    });

    res.status(200).json({
        status: 'Success',
        result: subCategories.length,
        data: subCategories,
    });
});

exports.getASubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id).populate({
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
    const subCategory = await SubCategory.findByIdAndUpdate(
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
    const subCategory = await SubCategory.findByIdAndRemove(req.params.id);

    if (!subCategory) {
        return next(new AppError('SubCategory not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});
