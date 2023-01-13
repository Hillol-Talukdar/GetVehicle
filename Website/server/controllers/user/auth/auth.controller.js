const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/user');
const AppError = require('../../../utils/appError');

exports.userCreateOrUpdate = catchAsync(async (req, res, next) => {
    const { photoUrl, email, displayName } = req.body.data;

    const user = await User.findOneAndUpdate(
        { email },
        { name: displayName, image: photoUrl },
        { new: true }
    );

    console.log(user)

    if (user) {
        if(user.blocked === true) {
            return next(new AppError('User not found!', 404));
        } else {
            res.status(200).json({
                status: 'Success',
                user,
            });
        }
    } else {
        const newUser = await new User({
            name: displayName,
            image: photoUrl,
            email,
        }).save();

        res.status(200).json({
            status: 'Success',
            data: newUser,
        });
    }
});

exports.currentUser = catchAsync(async (req, res, next) => {
    
    const user = await  User.findOne({ email: req.body.data.email });

    if(user) {
        if(user.blocked === true) {
            return next(new AppError('User not found!', 404));
        } else {
            res.status(200).json({
                status: 'Success',
                user: user,
            });
        }
    } else {
        return next(new AppError('User not found!', 404));
    }
});
