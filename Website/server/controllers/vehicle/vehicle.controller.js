const catchAsync = require('../../utils/catchAsync');
const vehicleData = require('../../data/vehicleData');
const { doc } = require('prettier');

exports.getAllVehicle = catchAsync(async (req, res, next) => {
    const doc = vehicleData;

    res.status(200).json({
        data: doc,
    });
});

exports.getVehicle = catchAsync(async (req, res, next) => {
    const vehicle = vehicleData.find((vehicle) => vehicle._id == req.params.id);
    res.status(200).json({
        data: vehicle,
    });
});
