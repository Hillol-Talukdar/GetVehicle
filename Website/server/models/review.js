const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            default: 0,
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
        isTrashed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
