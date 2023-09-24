const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isloggedin } = require('../middleware');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.get('/register', users.renderRegister);

router.post('/register', users.register);

router.get('/login', users.renderLogin);

router.post('/login', storeReturnTo,  passport.authenticate('local', { failureFlash:true, failureRedirect: '/login'}), users.Login);

router.get('/logout', users.Logout);

module.exports = router;