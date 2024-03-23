const express = require('express');
const path = require('path');
const router = express.Router();
const axios = require('axios');

const axiosInstance = require('./services/axios');
const isloggedInAlready = require('./middlewares/authentication');

//body parser
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const baseURI = process.env.URL || 'http://localhost:3000/';

//End Points

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/login', isloggedInAlready, (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

router.get('/chef', (req, res) => {
  res.sendFile(path.join(__dirname, 'chef_page.html'));
});

router.get('/faqs', (req, res) => {
  res.sendFile(path.join(__dirname, 'FAQs.html'));
});

router.get('/reviews', (req, res) => {
  res.sendFile(path.join(__dirname, 'review.html'));
});

router.post('/login', async (req, res, next) => {
  console.log('Am in login-route', req.body);
  try {
    let details = {
      email: req.body.email,
      password: req.body.password,
    };

    // const response = await fetch('http://localhost:3000/cookchef/v1/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(details),
    // });


        console.log(details)
        console.log(JSON.stringify(details))

        const response = await axiosInstance.post(baseURI+'cookchef/v1/login',
          JSON.stringify(details)
        , {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log(response)


    if (response.status === 200) {
      // If Successful send the landing page
      res.sendFile(path.join(__dirname, 'chef_page.html'));
    } else {
      // If there was an error in the request
      res.sendFile(path.join(__dirname, 'error.html'));
    }

    console.log(response);
    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error(error)
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  console.log('details', details);

  try {
    const response = await fetch('http://localhost:3000/cookchef/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });

    if (response.status === 200) {
      // If Successful send the landing page
      res.sendFile(path.join(__dirname, 'login.html'));
    } else {
      // If there was an error in the request
      res.sendFile(path.join(__dirname, 'error.html'));
    }

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
