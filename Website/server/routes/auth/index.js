const express = require('express');
const authController = require('../../controllers/user/auth/auth.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/create-or-update')
    .post(checkAuth, authController.userCreateOrUpdate);

module.exports = router;
