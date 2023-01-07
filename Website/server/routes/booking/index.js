const express = require('express');
const bookingController = require('../../controllers/booking/booking.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, bookingController.createBooking)
    .get(checkAuth, bookingController.getAllBookings);

router
    .route('/my')
    .get(checkAuth, bookingController.getAllMyBookings);

router
    .route('/:id')
    .get(checkAuth, bookingController.getABooking)
    .patch(checkAuth, bookingController.updateABooking)
    .delete(checkAuth, bookingController.deleteABooking);

router
    .route('/dates/:vehicleId')
    .get(bookingController.getAllBookingDates);

module.exports = router;
