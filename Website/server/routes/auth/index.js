const express = require('express');
const authController = require('../../controllers/auth/auth.controller');
const { authCheck } = require('../../middlewares/auth');
const router = express.Router();

router.route('/').get(authCheck, authController.createUser);

module.exports = router;
