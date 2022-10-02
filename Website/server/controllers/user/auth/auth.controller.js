const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/user');

exports.userCreateOrUpdate = catchAsync(async (req, res, next) => {
    const { photoUrl, email, displayName } = req.body.data;

    const user = await User.findOneAndUpdate(
        { email },
        { name: displayName, image: photoUrl },
        { new: true }
    );

    if (user) {
        res.status(200).json({
            status: 'Success',
            user,
        });
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

exports.currentUser = async (req, res) => {
    console.log(req.data);
    // User.findOne({ email: req.user.email }).exec((error, user) => {
    //     if (error) {
    //         throw new Error(error);
    //     }
    //     res.status(200).json({
    //         status: 'Success',
    //         user: user,
    //     });
    // });
};
