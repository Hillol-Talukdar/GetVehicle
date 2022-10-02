const express = require('express');
const authController = require('../../controllers/user/auth/auth.controller');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router
    .route('/user-create-or-update')
    .post(authController.userCreateOrUpdate);

router
    .route('/current-user')
    .post(authController.currentUser);

module.exports = router;
