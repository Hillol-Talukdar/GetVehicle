const catchAsync = require('../../utils/catchAsync');
const Vehicle = require('../../models/vehicle');

exports.createAVehicle = catchAsync(async (req, res, next) => {
    const newVehicle = await Vehicle.create(req.body);

    res.status(201).json({
        data: newVehicle,
    });
});

exports.getAVehicle = catchAsync(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(new AppError('Vehicle not found!', 404));
    }

    res.status(200).json({
        data: vehicle,
    });
});

exports.getAllVehicle = catchAsync(async (req, res, next) => {
    const vehicles = await Vehicle.find({});

    res.status(200).json({
        data: vehicles,
    });
});

exports.updateAVehicle = catchAsync(async (req, res, next) => {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    if (!updatedVehicle) {
        return next(new AppError('Vehicle not found!', 404));
    }

    res.status(200).json({
        data: updatedVehicle,
    });
});

exports.deleteAVehicle = catchAsync(async (req, res, next) => {
    const vehicleToDelete = await Vehicle.findByIdAndRemove(req.params.id);

    if (!vehicleToDelete) {
        return next(new AppError('Vehicle not found!', 404));
    }

    res.status(204).json({
        status: 'successful',
    });
});
