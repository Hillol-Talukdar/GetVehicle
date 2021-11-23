const mongoose = require("mongoose");
const slugify = require('slugify');
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength: 32,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
);

subCategorySchema.pre('save', async function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});


module.exports = mongoose.model('SubCategory', subCategorySchema);
