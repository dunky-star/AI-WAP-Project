const axios = require('axios');

exports.getRegister = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postRegister = (req, res, next) => {
  let details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  axios
    .post(process.env.URL + '/cookchef/v1/register', details, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
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

      console.log(response.data);
    })
    .catch(error => {
      console.error('Error forwarding request to backend:', error.message);
      res.status(500).render('error', {
        path: '/error',
        pageTitle: 'Error - Cook Food Chef',
      });
    });
};
