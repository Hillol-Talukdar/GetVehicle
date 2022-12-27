const catchAsync = require('../../utils/catchAsync');
const Vehicle = require('../../models/vehicle');
const User = require('../../models/user');

exports.createAVehicle = catchAsync(async (req, res, next) => {
    const newVehicle = await Vehicle.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: newVehicle,
    });
});

exports.getAVehicle = catchAsync(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id)
        .populate({
            path: 'category',
            select: 'name slug',
        })
        .populate({
            path: 'subCategory',
            select: 'name slug',
        })
        .populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name' },
        });

    if (!vehicle) {
        return next(new AppError('Vehicle not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: vehicle,
    });
});

exports.getAllVehicle = catchAsync(async (req, res, next) => {
    const vehicles = await Vehicle.find({})
        .populate({
            path: 'category',
            select: 'name slug',
        })
        .sort({ updatedAt: -1 });

    res.status(200).json({
        status: 'Success',
        result: vehicles.length,
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
        status: 'Success',
        data: updatedVehicle,
    });
});

exports.deleteAVehicle = catchAsync(async (req, res, next) => {
    const vehicleToDelete = await Vehicle.findByIdAndRemove(req.params.id);

    if (!vehicleToDelete) {
        return next(new AppError('Vehicle not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});

exports.vehicleStar = catchAsync(async (req, res, next) => {
    console.log('AISIIIIIIIIIIII');
    const vehicle = await Vehicle.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });
    const { star } = req.body;
    console.log('AISIIIIIIIIIIII 2');
    //check if logged in uuser have already added rating to this product
    let existingRatingObject = vehicle.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
    );

    //if user havenot left rating yet,
    if (existingRatingObject === undefined) {
        let ratingAdded = await Vehicle.findByIdAndUpdate(
            vehicle._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();

        // console.log("RatingAdded", ratingAdded);
        res.status(200).json(ratingAdded);
    } else {
        //if use already left rating
        const ratingUpdated = await Vehicle.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { 'ratings.$.star': star } },
            { new: true }
        ).exec();

        // console.log("RatingUpdated", ratingUpdated);
        res.status(200).json(ratingUpdated);
    }
});
