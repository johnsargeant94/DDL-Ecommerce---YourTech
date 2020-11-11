const {nanoid} = require('nanoid');
const AdminRoute = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');


AdminRoute.get('/admin', checkSignedIn, async (req, res) => {
    let products = await ProductModel.find({});
    products = products.map(product => product.toObject());
    // console.log(products)

    let user = await UserModel.find({});
    user = user.map(user => user.toObject());
    console.log(user)

    res.render('admin', {products});
});



module.exports = AdminRoute;