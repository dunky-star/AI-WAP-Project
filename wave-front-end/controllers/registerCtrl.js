const axios = require('axios');

exports.getRegister = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postRegister = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  axios
    .post(process.env.URL + '/cookchef/v1/register', userDetails)
    .then(response => {
      if (response.status === 200) {
        res.render('login', {
          path: '/login',
          pageTitle: 'Login - Cook Food Chef',
          message: 'Registration successful! Please login.',
        });
      } else {
        res.render('error', {
          path: '/error',
          pageTitle: 'Error - Cook Food Chef',
          errorMessage: 'Registration failed. Please try again.',
        });
      }
    })
    .catch(error => {
      console.error('Error during registration:', error.message);
      res.render('error', {
        path: '/error',
        pageTitle: 'Error - Cook Food Chef',
        errorMessage: 'Registration failed. Please try again later.',
      });
    });
};
