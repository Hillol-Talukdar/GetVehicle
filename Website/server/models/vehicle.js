const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            trim: true,
            required: true,
        },
        vehicleType: {
            type: String,
            enum: [
                // car
                'SEDAN',
                'COUPE',
                'SPORTS CAR',
                'STATION WAGON',
                'HATCHBACK',
                'CONVERTIBLE',
                'SUV',
                'MINIVAN',
                'PICKUP TRUCK',

                // bike
                'Cruiser',
                'Sport Bike',
                'Touring',
                'Off-Road',
                'Dual-Sport',

                // bycycle
                'Road Bike',
                'Mountain Bike',
                'Touring Bike',
                'Folding Bike',
                'Track Bike',
                'BMX',
                'Recumbent Bike',

                // scooter
                'Stunt Scooter',
                'Big wheel Scooter',
                'Dirt Scooter',
                'Electric Scooter',
                'Three-Wheel Scooters',
                'Foldable Scooter',
                'Space Scooter',
                'Foldable Scooter',
            ],
            trim: true,
            required: true,
        },
        genericType: {
            type: String,
            enum: ['Car', 'Bike', 'Bycycle', 'Scooter'],
            trim: true,
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
            enum: ['Petrol', 'Diesel', 'LPD', 'None'],
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
        Mileage: {
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
