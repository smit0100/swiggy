const reviewController = require('../controller/ratingController');
const { Router } = require('express');
const router = Router();


router.post('/addreview', reviewController.addReview);



module.exports = router