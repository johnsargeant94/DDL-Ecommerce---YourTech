const {nanoid} = require('nanoid');
const BasketRoute = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');

BasketRoute.get('/basket', (req, res) => {
    res.render('basket');
});


BasketRoute.get('/success', (req, res) => {
    res.render('success');
});
BasketRoute.get('/cancel', (req, res) => {
    res.render('cancel');
});

module.exports = BasketRoute;