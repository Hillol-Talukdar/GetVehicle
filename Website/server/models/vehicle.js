const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            trim: true,
            required: true,
        },
        categories: {
            category: String,
            subCategory: String,
        },
        transmission: {
            type: String,
            enum: ['Auto', 'Manual'],
            default: 'Manual',
            trim: true,
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'LPG', 'None'],
            default: 'None',
            trim: true,
        },
        engine: {
            type: String,
            trim: true,
        },
        bootSpace: {
            type: String,
            trim: true,
        },
        groundClearance: {
            type: String,
            trim: true,
        },
        costPerDay: {
            type: Number,
            default: 0,
        },
        seatCount: {
            type: Number,
            default: 1,
        },
        mileage: {
            type: Number,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        currentLocation: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],
            address: String,
        },
        bookingStatus: {
            type: Boolean,
            default: false,
        },
        photo: [String],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
