require('dotenv').config()
const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');
const wineKey = process.env.wineKey;
const winedb = require('request');

// models
const Wine = require('../models/wine.js');
const Comment = require('../models/comments.js');

//middleware
router.use(methodOverride('_method'));

/* Regions page */
router.get('/regions', function (req, res) {
  const responseWindDb = winedb('http://api.snooth.com/wines/?akey=' + wineKey + '&ip=66.28.234.115&q=napa+cabernet&xp=30', (err, responseWindDb, body) => {
    // console.log(body);
    // res.json(JSON.parse(body));
    const wines = JSON.parse(body);

    console.log(wines.wines[0].region);
    // res.send(wines);
    res.render('regions.ejs', {
      env: process.env,
      username: req.session.username,
      wines: wines
    });
  });
});

//Regions query data
// router.get('/regions/:query', (req, res) => {
//   const responseWindDb = winedb('http://api.snooth.com/wines/?akey=' + wineKey + '&ip=66.28.234.115&q=napa+cabernet&xp=30', (err, responseWindDb, body) => {
//     // console.log(body);
//     // res.json(JSON.parse(body));
//     const wines = JSON.parse(body);

//     console.log(wines.wines);
//     // res.send(wines.wines);
//     res.render('regions.ejs', {
//       env: process.env,
//       username: req.session.username,
//       wines: wines.wines
//     });
//   });
// });





/* Home page */
router.get('/home', function (req, res) {
  console.log("================");
  console.log(req.session);
  res.render('home.ejs', {
    username: req.session.username
  });
});

/* Grape Varieties page */
router.get('/grape-varieties', function (req, res) {
  console.log("================");
  console.log(req.session);
  res.render('grape-varieties.ejs', {
    username: req.session.username

  });
});

/* User Cellars page */
router.get('/user-cellars', function (req, res) {
  console.log("================");
  console.log(req.session);
  res.render('user-cellars.ejs', {
    username: req.session.username
  });
});


////////// the 7 Routes ////////////

  // Index route  ------------------1
  router.get('/', async (req, res) => {
    const allWine = await Wine.find();
  if (req.session.logged) {
      res.render('index.ejs', {
        wines: allWine,
        username: req.session.username
      });
  } else {
    res.redirect('/user/login');
  }
});



// New wine        -----------------2
router.get('/new', (req, res) => {
  // res.render('new');
  res.render('new.ejs', {
    username: req.session.username
  });
});

// Create New wine -----------------3
router.post('/', async (req, res) => {
  try {
    const newWine = await Wine.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});



// Show route      -----------------4
router.get('/:id', async (req, res) => {
  const oneWine = await Wine.findById(req.params.id);
  const comments = await Comment.find({ wine: oneWine._id });

  res.render('show.ejs', {
    oneWine: oneWine,
    comments: comments,
    username: req.session.username
  });
});

// Edit wine       -----------------5
router.get('/:id/edit', async (req, res) => {
  const wines = await Wine.findById(req.params.id);
  res.render(
    'edit.ejs',
    {
      wine: wines,
      username: req.session.username
    }
  );
});

// Update the Edits of Wines -------6
router.put('/:id', async (req, res) => {
  let wines = await Wine.findByIdAndUpdate(req.params.id, req.body);
  wines[req.params.id] = wines;
  res.redirect('/wines/');
});

// Delete wines    -----------------7
router.delete('/:id', async (req, res) => {
  const product = await Wine.findByIdAndRemove(req.params.id);
  // wines.splice(req.params.index, 1);
  res.redirect('/wines');
});



// /* Log In */
// app.get('/login/', function (req, res) {
//   res.render('login.ejs');
// });//



// add JSON route for seed data












module.exports = router;
