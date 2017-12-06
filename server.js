require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const session  = require('express-session');
const bcrypt   = require('bcrypt');
const app      = express();
const PORT     = process.env.PORT || 3000;
const wineKey  = process.env.wineKey;
// const winedb = require('http://api.snooth.com/wines/?akey=<%=env.wineKey%>&ip=66.28.234.115&q=napa+cabernet&xp=30') 
const winedb = require('request');

app.get('/wineApi/:query',  (req, res) => {
  const response =  winedb('http://api.snooth.com/wines/?akey='+ wineKey + '&ip=66.28.234.115&q=napa+cabernet&xp=30',(err,response,body) => {
    // console.log(body);
    res.json(JSON.parse(body));
  });


});

const hashedString = bcrypt.hashSync('peter', bcrypt.genSaltSync(10));
console.log(hashedString);

// google maps API & snooth API
console.log(process.env.test)
console.log(process.env.APIKEY)
console.log(process.env.wineKey)

// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wine_comments';
mongoose.connect(mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

// test db connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// We're not using this yet, but we will
// const usersModel = require('./models/users.js');

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: "aweradfgdfr",
  resave: false,
  saveUninitialized: false
}));

// controllers
const wineController = require('./controllers/wine.js');
const commentsController = require('./controllers/comments.js');
const sessionsController = require('./controllers/session.js');

app.use('/wines', wineController);
app.use('/comments', commentsController);
app.use('/user', sessionsController);




// root route
app.get('/', (req, res) => res.redirect('/wines'));

// :ear
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Wine app on port: ', PORT);
  console.log('===========================');
});
