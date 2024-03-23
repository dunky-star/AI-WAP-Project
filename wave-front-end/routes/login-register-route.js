const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

//End Points

router.get('/', (req, res, next) => {
  res.render('index', { path: '/', pageTitle: 'Home - Cook Food Chef' });
});

router.get('/home', (req, res, next) => {
  res.render('index', { path: '/', pageTitle: 'Home - Cook Food Chef' });
});

router.get('/login', (req, res) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
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

router.post('/login', async (req, res, next) => {
  console.log('Am in login-route', req.body);
  try {
    let details = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await fetch(process.env.URL + '/cookchef/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });

    if (response.ok) {
      // If Successful send the AI assistant page
      res.render('chef_page', {
        path: '/chef_page',
        pageTitle: 'Reviews - Cook Food Chef',
      });
    } else {
      // If there was an error in the request
      res.render('error', {
        path: '/error',
        pageTitle: 'Error - Cook Food Chef',
      });
    }

    console.log(await response.json());
    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res
      .status(500)
      .render('error', { path: '/error', pageTitle: 'Error - Cook Food Chef' });
  }
});

router.post('/signup', async (req, res, next) => {
  console.log('Am in signup-route', req.body);
  let details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  console.log('details', details);

  try {
    const response = await fetch(process.env.URL + '/cookchef/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });

    if (response.ok) {
      // If Successful send the landing page
      res.render('login', {
        path: '/login',
        pageTitle: 'Login - Register - Cook Food Chef',
      });
    } else {
      // If there was an error in the request
      res.status(500).render('error', {
        path: '/error',
        pageTitle: 'Error - Cook Food Chef',
      });
    }

    const responseData = await response.json();
    console.log(responseData);

    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res
      .status(500)
      .render('error', { path: '/error', pageTitle: 'Error - Cook Food Chef' });
  }
});

module.exports = router;
