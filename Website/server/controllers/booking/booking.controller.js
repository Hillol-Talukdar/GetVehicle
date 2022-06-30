const Booking = require('../../models/booking');
const User = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const createBooking = catchAsync(async (req, res, next) => {
    const loggedInUser = await User.findOne({ email: req.user.email });

    req.body.user = loggedInUser._id;
    const newBooking = await Booking.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: newBooking,
    });
});

const getAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({})
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    res.status(200).json({
        status: 'Success',
        data: bookings,
    });
});

const getABooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    res.status(200).json({
        status: 'Success',
        data: booking,
    });
});

const updateABooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle' });

    if (!booking) {
        return next(new AppError('Booking not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: booking,
    });
});

const deleteABooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findByIdAndRemove(req.params.id);

    if (!booking) {
        return next(new AppError('Booking not found!', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});

module.exports = {
    createBooking,
    getAllBookings,
    getABooking,
    updateABooking,
    deleteABooking,
};
