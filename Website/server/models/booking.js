const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
            // required: true,
        },
        user: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        vehicle: {
            type: ObjectId,
            ref: 'Vehicle',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
