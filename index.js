const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');
const path = require('path'); //for css and photos front-end
// Model
const SessionModel = require('./models/sessionModel');
const ProductModel = require('./models/productModel');

// Routes
const router = require('./routes/router');
// const productRouter = require('./routes/productRouter');

mongoose.connect('mongodb+srv://John:password123abc@johncluster.f8hda.mongodb.net/signup?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.static(path.join(__dirname, 'public'))); //for css and photos front-end

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        secure: false,
        sameSite: true
    }
}));

app.use(async (req, res, next) => {
    let loggedIn = await SessionModel.checkSession(req.session.userID);

    res.locals.loggedIn = loggedIn;

    return next();
});

app.use('/', router);
// app.use('/products', productRouter)



// Posting Products using Form in admin page


app.post('/', async (req, res) => {
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

app.listen('3000');