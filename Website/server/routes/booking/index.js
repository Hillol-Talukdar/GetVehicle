const express = require('express');
const bookingController = require('../../controllers/booking/booking.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, bookingController.createBooking)
    .get(checkAuth, bookingController.getAllBookings);

router
    .route('/:id')
    .get(checkAuth, bookingController.getABooking)
    .patch(checkAuth, bookingController.updateABooking)
    .delete(checkAuth, bookingController.deleteABooking);

module.exports = router;
