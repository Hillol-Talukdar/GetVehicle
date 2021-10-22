const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minLength: 2,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            select: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        blocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User',
        },
        image: [String],
        address: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
                required: true,
            },
            coordinates: [Number],
            address: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
