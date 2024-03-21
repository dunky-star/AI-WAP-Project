const express = require('express');
const path = require('path');
const router = express.Router();
const axios = require('axios');

//body parser
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//End Points

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.post('/login', async (req, res, next) => {
  console.log('Am in login-route', req.body);
  try {
    let details = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });

    if (response.ok) {
      // If Successful send the landing page
      res.sendFile(path.join(__dirname, 'chef_page.html'));
    } else {
      // If there was an error in the request
      res.sendFile(path.join(__dirname, 'error.html'));
    }

    console.log(await response.json());
    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res.status(500).sendFile(path.join(__dirname, 'error.html'));
  }
});

// router.post('/login', async (req, res, next) => {
//   console.log('Am in login-route');
//   try {
//     const backendResponse = await axios.post(
//       'http://127.0.0.1:3000/api/auth/signin',
//       req.body
//     );
//     // If Successful send the landing page
//     //res.json(backendResponse.data);
//     if (backendResponse) res.sendFile(path.join(__dirname, 'chef_page.html'));
//     else res.sendFile(path.join(__dirname, 'error.html'));
//     console.log(backendResponse.data);
//     //res.sendFile(path.join(__dirname, 'chef_page.html'));
//   } catch (error) {
//     console.error('Error forwarding request to backend:', error.message);
//     res.status(500).sendFile(path.join(__dirname, 'error.html'));
//   }
// });

router.post('/signup', async (req, res, next) => {
  console.log('Am in signup-route', req.body);
  let details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  console.log('details', details);

  try {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });

    if (response.ok) {
      // If Successful send the landing page
      res.sendFile(path.join(__dirname, 'chef_page.html'));
    } else {
      // If there was an error in the request
      res.sendFile(path.join(__dirname, 'error.html'));
    }

    const responseData = await response.json();
    console.log(responseData);

    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res.status(500).sendFile(path.join(__dirname, 'error.html'));
  }
});

// router.post('/signup', async (req, res, next) => {
//   console.log('Am in signup-route', req.body);
//   let details = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   console.log('details', details);
//   try {
//     const backendResponse = await axios.post(
//       'http://localhost:3000/api/auth/signup',
//       details
//     );
//     // If Successful send the landing page
//     if (backendResponse) res.sendFile(path.join(__dirname, 'chef_page.html'));
//     else res.sendFile(path.join(__dirname, 'error.html'));
//     //res.json(backendResponse.data);

//     console.log(backendResponse.data);
//     //res.sendFile(path.join(__dirname, 'chef_page.html'));
//   } catch (error) {
//     console.error('Error forwarding request to backend:', error.message);
//     res.status(500).sendFile(path.join(__dirname, 'error.html'));
//   }
// });

// router.post('/signup', async (req, res, next) => {
//   console.log('Am in signup-route', req.body);
//   let details = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   console.log('details', details);
//   try {
//     const backendResponse = await axios.post(
//       'http://localhost:3000/api/auth/signup',
//       details
//     );
//     // If Successful send the landing page
//     if (backendResponse) res.sendFile(path.join(__dirname, 'chef_page.html'));
//     else res.sendFile(path.join(__dirname, 'error.html'));
//     //res.json(backendResponse.data);

//     console.log(backendResponse.data);
//     //res.sendFile(path.join(__dirname, 'chef_page.html'));
//   } catch (error) {
//     console.error('Error forwarding request to backend:', error.message);
//     res.status(500).sendFile(path.join(__dirname, 'error.html'));
//   }
// });

// router.get('/fail', (req, res, next) => {
//   counter = counter++;
//   res.sendFile(path.join(__dirname, 'html', 'failPage.html'));
// });

// router.post('/failRedirect', (req, res, next) => {
//   res.redirect('/');
// });

// router.post('/post', (req, res, next) => {
//   if (counter <= 3) {
//     let inputNumber = parseInt(req.body.input);
//     console.log(inputNumber, counter);
//     if (inputNumber === 9) {
//       res.send('You win after ' + counter + 'atempts');
//     } else {
//       res.redirect('/');
//     }
//   } else {
//     res.redirect('/fail');
//   }
// });

module.exports = router;
