const { Router } = require('express');
const router = Router();
const ratingController = require('../controller/ratingAndReviewController');

router.post('/add', ratingController.addRating);


module.exports = router;