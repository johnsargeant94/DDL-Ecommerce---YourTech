const { nanoid } = require('nanoid');
const AdminRoute = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const { checkAdminLoggedIn } = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');


AdminRoute.get('/admin', checkAdminLoggedIn, async (req, res) => {
    let products = await ProductModel.find({});
    products = products.map(product => product.toObject());

    let user = await UserModel.find({});
    user = user.map(user => user.toObject());
    //console.log(user)

    res.render('admin', { products, user });
});


// Posting Products using Form in admin page
AdminRoute.post('/admin', checkAdminLoggedIn, async (req, res) => {

    //Creating User
    const { userName, email, age, phoneNumber, password, role } = req.body;

    if (!userName || !email || !age || !password) {
        res.render('signup', { err: 'Missing reuqired information' });
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.render('signup', { err: 'A user with this email or phone number already exists' });
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    const user = new UserModel({
        name: userName,
        age,
        email,
        phoneNumber,
        password: hashedPassword,
        role
    });

    user.save();

    req.session.userID = nanoid();
    req.session.save();

    res.redirect('/admin');

    //Create Product
    
})

AdminRoute.delete('/admin/deleteProduct/', (req, res) => {
    // const {id} = req.body

    // deleteOne({})
})

AdminRoute.post('/admin/product', checkAdminLoggedIn, async (req, res) => {

    //Create Product
    const { name, price, inStock, image, category } = req.body;

    const product = new ProductModel({
        name: name,
        price: price,
        inStock: inStock,
        image: image,
        category: category,
        timeUploaded: Date.now()
    });
    product.save().then(() => {
        res.render('admin', { success: 'success!' });
        return
    }).catch((err) => {
        res.render('admin', { err })
    });
})

AdminRoute.delete('/admin/deleteProduct/', (req, res) => {
    // const {id} = req.body

    // deleteOne({})
})



module.exports = AdminRoute;