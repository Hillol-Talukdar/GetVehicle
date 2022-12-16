require('dotenv').config();
const catchAsync = require('../../utils/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripePayment = catchAsync(async (req, res, next) => {
    let { amount, user, userPhoneNumber, vehicleData, id } = req.body;

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: `${vehicleData._id} | ${vehicleData.model} | ${user.email} | ${userPhoneNumber}`,
        payment_method: id,
        confirm: true,
    });
    console.log('Payment', payment);

    res.status(200).json({
        status: 'Success',
        success: true,
    });
});

module.exports = {
    stripePayment,
};
