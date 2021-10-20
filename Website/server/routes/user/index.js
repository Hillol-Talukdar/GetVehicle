const express = require('express');
const userController = require('../../controllers/user/user.controller');

const router = express.Router();

router.route('/').get(userController.getAllUser);

router.route('/:id').get(userController.getAUser);

module.exports = router;
