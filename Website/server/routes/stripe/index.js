const express = require('express');
const router = express.Router();
const stripeController = require('../../controllers/stripe/stripe.controller');

router.route('/').post(stripeController.stripePayment);

module.exports = router;
