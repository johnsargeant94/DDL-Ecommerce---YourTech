const { nanoid } = require('nanoid');
const router = require('express').Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const { checkSignedIn } = require('../controllers/auth');
const sessionModel = require('../models/sessionModel');

router.get('/', async (req, res) => {
    let products = await ProductModel.find({});
    products = products.map(product => product.toObject());
    res.render('index', { products });
});

router.get('/users', async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', async (req, res) => {
    const { name, email, age, phoneNumber, password } = req.body;

    if (!name || !email || !age || !password) {
        res.render('signup', { err: 'Missing reuqired information' });
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.render('signup', { err: 'A user with this email or phone number already exists' });
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    const user = new UserModel({
        name,
        age,
        email,
        phoneNumber,
        password: hashedPassword,
        role: 'User'
    });

    user.save();

    req.session.userID = nanoid();
    req.session.email = email
    req.session.save();

    res.redirect('/profile');
});
router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', async (req, res) => {
    let { email, password, username } = req.body;

    if (!await UserModel.checkExists(email)) {
        res.render('login', { err: 'A user with this email doesn\'t exist' }); //ued res.render because res.redirect doesnt send err also add to login.hsb
        return;
    }

    if (!await UserModel.comparePassword(email, password)) {
        res.render('login', { err: 'You have eneterd the wrong password' });
    }
    req.session.admin = await UserModel.checkIfAdmin(email)

    req.session.userID = nanoid();
    req.session.email = email;
    req.session.save();
    if (req.session.admin) {
        res.redirect('/admin');
    }
    else {
        res.redirect('/profile');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/', async (req, res) => {
    let products = await ProductModel.find({});
    products = products.map(product => product.toObject());
    res.render('index', { products });
});

module.exports = router;