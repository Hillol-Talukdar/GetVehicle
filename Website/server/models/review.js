const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            default: '',
        },
        deleted: {
            type: Boolean,
            default: false,
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

module.exports = mongoose.model('Review', reviewSchema);
