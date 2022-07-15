const Review = require('../../models/review');
const User = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const createReview = catchAsync(async (req, res, next) => {
    const loggedInUser = await User.findOne({ email: req.user.email });
   
    req.body.user = loggedInUser._id;
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: newReview,
    });
});

const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find({})
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    res.status(200).json({
        status: 'Success',
        data: reviews,
    });
});

const getAReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    res.status(200).json({
        status: 'Success',
        data: review,
    });
});

const updateAReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    if (!review) {
        return next(new AppError('Review not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: review,
    });
});

const deleteAReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndRemove(req.params.id);

    if (!review) {
        return next(new AppError('Review not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});

module.exports = {
    createReview,
    getAllReviews,
    getAReview,
    updateAReview,
    deleteAReview,
};