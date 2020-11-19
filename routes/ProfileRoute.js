const { nanoid } = require('nanoid');
const ProfileRoute = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const { checkSignedIn } = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');


ProfileRoute.get('/profile', checkSignedIn, (req, res) => {
    res.render('profile');
});

ProfileRoute.get('/updateprofile', checkSignedIn, (req, res) => {
    res.render('updateprofile');
});

ProfileRoute.get('/orderlist', checkSignedIn, (req, res) => {
    res.render('orderlist');
});

ProfileRoute.get('/profilesetting', checkSignedIn, (req, res) => {
    res.render('profilesetting');
});



module.exports = ProfileRoute;