const express = require('express');
const router = express.Router();
const checkAuth = require('../../middlewares/checkAuth');
const reviewController = require('../../controllers/review/review.controller');

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(checkAuth, reviewController.createReview);

router
    .route('/:id')
    .get(reviewController.getAReview)
    .patch(checkAuth, reviewController.updateAReview)
    .delete(checkAuth, reviewController.deleteAReview);

module.exports = router;
