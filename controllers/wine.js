const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');

// models
const Wine = require('../models/wine.js');
const Comment = require('../models/comments.js');

//middleware
router.use(methodOverride('_method'));


// Main routes //
/* Index */
router.get('/home', function (req, res) {
  console.log("================");
  console.log(req.session);
  res.render('home.ejs', {
    username: req.session.username
  });
});


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
