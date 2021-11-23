const User = require('../../models/user');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getAUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('User Not Found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: user,
    });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        status: 'Success',
        result: users.length,
        data: users,
    });
});
