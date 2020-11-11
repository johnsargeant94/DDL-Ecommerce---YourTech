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

// Posting Products using Form in admin page
AdminRoute.post('/', checkSignedIn, async (req, res) => {
    const {name, price, inStock, image, category} = req.body;

    const product = new ProductModel({
            name: name,
            price: price,
            inStock: inStock,
            image: image,
            category: category,
            timeUploaded: Date.now()
    });
    product.save().then(() => {
        res.render('admin', {success: 'success!'});
        return
    }).catch((err) => {
        res.render('admin', {err})
    });
})



module.exports = AdminRoute;