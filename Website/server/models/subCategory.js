const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
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
            type: objectId,
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

subCategorySchema.pre(/^find/, function (next) {
    if (!this.isModified('name')) {
        return next();
    }

    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
