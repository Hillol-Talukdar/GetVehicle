const catchAsync = require('../../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
    res.json({
        data: 'Create User Controller',
    });
});
