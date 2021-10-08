const express = require('express');
const categoryController = require('../../controllers/category/category.controller');
const router = express.Router();

router.route('/').post(categoryController.createCategory);

module.exports = router;
