const express = require('express');
const userController = require('../../controllers/user/user.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router.route('/').get(checkAuth, userController.getAllUser);

router.route('/:id').get(checkAuth, userController.getAUser);

module.exports = router;
