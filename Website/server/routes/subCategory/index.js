const express = require('express');
const subCategoryController = require('../../controllers/subCategory/subCategory.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, subCategoryController.createSubCategory)
    .get(subCategoryController.getAllSubCategories);

router
    .route('/:id')
    .get(subCategoryController.getASubCategory)
    .patch(checkAuth, subCategoryController.updateASubCategory)
    .delete(checkAuth, subCategoryController.deleteASubCategory);

module.exports = router;
