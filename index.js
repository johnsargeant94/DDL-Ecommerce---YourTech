const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');
const path = require('path'); //for css and photos front-end
const dotenv = require('dotenv');
dotenv.config();

// const pubKey = process.env.Publishable_key;
const url = process.env.MongoDB_URL
const pubKey = process.env.Publishable_key
const secretKey = process.env.Secret_key;
// const Your_Domain = 'http://localhost:3000';
const stripe = require('stripe')(secretKey);

const YOUR_DOMAIN = 'http://localhost:3000';


// Model
const SessionModel = require('./models/sessionModel');
const ProductModel = require('./models/productModel');

// Routes
const router = require('./routes/router');
const AdminRoute = require('./routes/AdminRoute');
const ProfileRoute = require('./routes/ProfileRoute');
const BasketRoute = require('./routes/BasketRoute');
const ProductRoute = require('./routes/ProductRoute');


mongoose.connect(url, {
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

// Use Routes
app.use('/', router);
app.use('/', AdminRoute);
app.use('/', ProfileRoute);
app.use('/', BasketRoute);
app.use('/', ProductRoute);


app.post('/create-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'GBP',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    res.json({ id: session.id });
  });

app.listen('3000');