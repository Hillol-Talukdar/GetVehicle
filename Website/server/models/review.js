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

module.exports = mongoose.model('Review', reviewSchema);
