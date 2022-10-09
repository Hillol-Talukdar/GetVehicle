const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const vehicleSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
        subCategory: {
            type: ObjectId,
            ref: 'SubCategory',
            required: true,
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
            min: 0,
        },
        seatCount: {
            type: Number,
            default: 1,
        },
        mileage: {
            type: Number,
            default: 1,
            min: 1,
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
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
