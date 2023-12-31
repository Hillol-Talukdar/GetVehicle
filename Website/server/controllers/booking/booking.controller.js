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
        .populate({ path: 'vehicle', select: 'model'})
        .sort({ createdAt: -1 });;

    res.status(200).json({
        status: 'Success',
        data: bookings,
    });
});

const getAllMyBookings = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });

    const bookings = await Booking.find({user: user._id})
        .populate({ path: 'user', select: 'name email' })
        .populate({ path: 'vehicle', select: 'model'})
        .sort({ createdAt: -1 });;

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

const getFormattedDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleString('en-us', options);
};

var isBeforeOrEqualToCurrentDate = function (date) {
    const givenDate = date;
    const currentDate = new Date();
    if (currentDate > givenDate) return false;
    return true;
};

const getSanitizedBookingDates = (bookingDatesDetails) => {
    let sanitizedBookingDates = [];

    bookingDatesDetails.forEach((bookingDates) => {
        if (
            isBeforeOrEqualToCurrentDate(bookingDates?.receiveDate) &&
            !bookingDates?.isTrashed && !bookingDates?.isCanceled
        ) {
            sanitizedBookingDates.push({
                handOverDate: getFormattedDate(bookingDates?.handOverDate),
                receiveDate: getFormattedDate(bookingDates?.receiveDate),
            });
        }
    });
    return sanitizedBookingDates;
};

const getAllBookingDates = catchAsync(async (req, res, next) => {
    const bookingDates = await Booking.find({
        vehicle: req.params.vehicleId,
    }).select('handOverDate receiveDate isTrashed isCanceled');

    const sanitizedBookingDates = getSanitizedBookingDates(bookingDates);

    res.status(200).json({
        status: 'Success',
        data: sanitizedBookingDates,
    });
});

module.exports = {
    createBooking,
    getAllBookings,
    getAllMyBookings,
    getABooking,
    updateABooking,
    deleteABooking,
    getAllBookingDates,
};
