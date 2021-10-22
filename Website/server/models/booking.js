const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        totalAmount: {
            type: Number,
            required: true,
        },
        totalDays: {
            type: Number,
            required: true,
            min: 1,
        },
        paid: {
            type: Boolean,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Online'],
        },
        delivered: {
            type: Boolean,
            required: true,
        },
        received: {
            type: Boolean,
            required: true,
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        receiveDate: {
            type: Date,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        vehicle: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
