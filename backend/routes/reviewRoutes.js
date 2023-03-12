const reviewController = require('../controller/ratingAndReviewController');
const { Router } = require('express');
const router = Router();


router.post('/addreview', reviewController.addRating);



module.exports = router