const express = require('express');
const router = express.Router({mergeParams:true});
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {reviewSchema } = require('../schemas.js');
const { isloggedin, isReviewAuthor, validateReview } = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isloggedin, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId',isloggedin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;