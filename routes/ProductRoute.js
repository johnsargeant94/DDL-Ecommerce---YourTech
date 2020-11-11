const ProductRoute = require('express').Router();
const ProductModel = require('../models/productModel');





ProductRoute.get('/Desktop', async (req, res) => {
    let products = await ProductModel.find({category: 'Desktop'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Desktop', {products});
});


ProductRoute.get('/Laptop', async (req, res) => {
    let products = await ProductModel.find({category: 'Laptop'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Laptop', {products});
});


ProductRoute.get('/Watch', async (req, res) => {
    let products = await ProductModel.find({category: 'Watch'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('watch', {products});
});



ProductRoute.get('/Mobile-Phones', async (req, res) => {
    let products = await ProductModel.find({category: 'Mobile phones'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Mobile-Phones', {products});
});


ProductRoute.get('/Tablet', async (req, res) => {
    let products = await ProductModel.find({category: 'Tablet'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Tablet', {products});
});


ProductRoute.get('/Accessories', async (req, res) => {
    let products = await ProductModel.find({category: 'Accessories'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Accessories', {products});
});


ProductRoute.get('/Tv', async (req, res) => {
    let products = await ProductModel.find({category: 'TV'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Tv', {products});
});


module.exports = ProductRoute;