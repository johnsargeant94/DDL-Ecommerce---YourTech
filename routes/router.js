const {nanoid} = require('nanoid');
const router = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');

router.get('/', async (req, res) => {
    let products = await ProductModel.find({});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('index', {products});
});

router.get('/users', async(req, res)=> {
    const users = await UserModel.find({});
    res.send(users);
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', async(req, res) => {
    const {name, email, age, phoneNumber, password} = req.body;

    if (!name || !email || !age || !password) {
        res.render('signup',{err:'Missing reuqired information'});
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.render('signup',{err:'A user with this email or phone number already exists'});
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    const user = new UserModel({
        name,
        age,
        email,
        phoneNumber,
        password: hashedPassword
    });

    user.save();

    req.session.userID = nanoid();
    req.session.save();

    res.redirect('/profile');
});
router.get('/login', (req,res) =>{
    res.render('login')
});



router.post('/login', async(req, res) => {
    let {email, password, username} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.render('login', {err: 'A user with this email doesn\'t exist'}); //ued res.render because res.redirect doesnt send err also add to login.hsb
        return;
    }

    if (await UserModel.comparePassword(email, password)) {

        req.session.userID = nanoid();
        req.session.save();
        res.redirect('/profile');
        return;
    }

    res.render('login', {err: 'You have eneterd the wrong password'});
});

router.get('/profile', checkSignedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/'); //when logged out it will send you back to the home Page
});

// Showing product on a table
router.get('/admin', checkSignedIn, async (req, res) => {
    let products = await ProductModel.find({});
    products = products.map(product => product.toObject());
    // console.log(products)

    let user = await UserModel.find({});
    user = user.map(user => user.toObject());
    console.log(user)

    res.render('admin', {products});
});

router.get('/', async (req, res) => {
    let products = await ProductModel.find({});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('index', {products});
});

router.get('/basket', (req, res) => {
    res.render('basket');
});

router.get('/Desktop', async (req, res) => {
    let products = await ProductModel.find({category: 'Desktop'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Desktop', {products});
});

router.get('/success', (req, res) => {
    res.render('success');
});

router.get('/cancel', (req, res) => {
    res.render('cancel');
});


router.get('/Laptop', async (req, res) => {
    let products = await ProductModel.find({category: 'Laptop'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Laptop', {products});
});

router.get('/Watch', async (req, res) => {
    let products = await ProductModel.find({category: 'Watch'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('watch', {products});
});



router.get('/Mobile-Phones', async (req, res) => {
    let products = await ProductModel.find({category: 'Mobile phones'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Mobile-Phones', {products});
});


router.get('/Tablet', async (req, res) => {
    let products = await ProductModel.find({category: 'Tablet'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Tablet', {products});
});

router.get('/Accessories', async (req, res) => {
    let products = await ProductModel.find({category: 'Accessories'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Accessories', {products});
});

router.get('/Tv', async (req, res) => {
    let products = await ProductModel.find({category: 'TV'});
    // products = products.toObject();]
    console.log(products)
    products = products.map(product => product.toObject());
    res.render('Tv', {products});
});
router.get('/Tablet', (req, res) => {
    res.render('Tablet');
});

router.get('/updateprofile', (req, res) => {
    res.render('updateprofile');
});

router.get('/orderlist', (req, res) => {
    res.render('orderlist');
});

router.get('/profilesetting', (req, res) => {
    res.render('profilesetting');
});




    
module.exports = router;