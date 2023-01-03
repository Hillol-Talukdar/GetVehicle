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
        handedOver: {
            type: Boolean,
            required: true,
        },
        received: {
            type: Boolean,
            required: true,
        },
        handOverDate: {
            type: Date,
            required: true,
        },
        receiveDate: {
            type: Date,
            required: true,
        },
        user: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        userPhoneNumber: {
            type: String,
            required: true
        },
        vehicle: {
            type: ObjectId,
            ref: 'Vehicle',
            required: true,
        },
        isCanceled: {
            type: Boolean,
            default: false,
        },
        isTrashed: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
