const catchAsync = require('../../utils/catchAsync');
const vehicleData = require('../../data/vehicleData');

exports.getAllVehicle = catchAsync(async (req, res, next) => {
    const doc = vehicleData;

    res.status(200).json({
        data: doc,
    });
});
