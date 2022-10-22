const express = require('express');
const categoryController = require('../../controllers/category/category.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, categoryController.createCategory)
    .get(categoryController.getAllCategories);

router
    .route('/subCategory/:id')
    .get(categoryController.getAllSUbCategoriesOfACategory);

router
    .route('/:id')
    .get(categoryController.getACategory)
    .patch(checkAuth, categoryController.updateACategory)
    .delete(checkAuth, categoryController.deleteACategory);

module.exports = router;
