const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 2,
            unique: true,
        },
        subCategories: [
            {
                name: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
