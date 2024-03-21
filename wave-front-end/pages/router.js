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
  console.log('Am in route');
  try {
    const backendResponse = await axios.post(
      'http://localhost:3001/backend-route',
      req.body
    );
    // If Successful send the landing page
    //res.json(backendResponse.data);
    if (backendResponse) res.sendFile(path.join(__dirname, 'chef_page.html'));
    else res.sendFile(path.join(__dirname, 'error.html'));
    console.log(backendResponse.data);
    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res.status(500).sendFile(path.join(__dirname, 'error.html'));
  }
});

router.post('/signup', async (req, res, next) => {
  console.log('Am in route');
  try {
    const backendResponse = await axios.post(
      'http://localhost:3002/backend-route',
      req.body
    );
    // If Successful send the landing page
    res.json(backendResponse.data);

    console.log(backendResponse.data);
    //res.sendFile(path.join(__dirname, 'chef_page.html'));
  } catch (error) {
    console.error('Error forwarding request to backend:', error.message);
    res.status(500).sendFile(path.join(__dirname, 'error.html'));
  }
});

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
