const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const campgrouds = require('../controllers/campgrounds');
const Campground = require('../models/campground');
const {validateCampground } = require('../schemas.js');
const {isloggedin,isAuthor} = require('../middleware.js');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.get('/', catchAsync(campgrouds.index));

router.get('/new', isloggedin, catchAsync(campgrouds.renderNewForm));

router.post('/', isloggedin, upload.array('image'), validateCampground, catchAsync(campgrouds.createCampground));

router.get('/:id', catchAsync(campgrouds.showCampground));

router.get('/:id/edit', isloggedin, isAuthor, catchAsync(campgrouds.renderEditForm));

router.put('/:id', isloggedin, isAuthor, upload.array('image') , validateCampground , catchAsync(campgrouds.updateCampground));

router.delete('/:id', isloggedin, isAuthor, catchAsync(campgrouds.deleteCampground))

module.exports = router;