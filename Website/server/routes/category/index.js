const express = require('express');
const categoryController = require('../../controllers/category/category.controller');
const router = express.Router();

router
    .route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories);

router
    .route('/:id')
    .get(categoryController.getACategory)
    .patch(categoryController.updateACategory)
    .delete(categoryController.deleteACategory);

module.exports = router;
