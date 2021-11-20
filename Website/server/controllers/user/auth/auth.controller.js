const catchAsync = require('../../../utils/catchAsync');

exports.userCreateOrUpdate = catchAsync(async (req, res, next) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name: email.split('@')[0], picture },
        { new: true }
    );

    if (user) {
        // console.log("USER UPDATED", user);
        res.status(200).json(user);
    } else {
        const newUser = await new User({
            name: email.split('@')[0],
            picture,
            email,
        }).save();

        // console.log("USER CREATED", newUser);
        res.status(200).json(newUser);
    }
});
