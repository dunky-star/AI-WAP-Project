const express = require('express');
const router = express.Router();
let session = require('express-session');

//End Points

router.get('/', (req, res, next) => {
  res.render('index', { path: '/', pageTitle: 'Home - Cook Food Chef' });
});

router.get('/home', (req, res, next) => {
  res.render('index', { path: '/', pageTitle: 'Home - Cook Food Chef' });
});

router.get('/about', (req, res) => {
  res.render('about', { path: '/about', pageTitle: 'About - Cook Food Chef' });
});

router.get('/chef', (req, res) => {
  res.render('chef', { path: '/chef', pageTitle: 'Chef - Cook Food Chef' });
});

router.get('/faqs', (req, res) => {
  res.render('FAQs', {
    path: '/faqs',
    pageTitle: 'Frequently Asked Question - Cook Food Chef',
  });
});

router.get('/reviews', (req, res) => {
  res.render('review', {
    path: '/reviews',
    pageTitle: 'Reviews - Cook Food Chef',
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(null);
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
});

module.exports = router;
