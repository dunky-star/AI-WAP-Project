const axios = require('axios');

exports.getLogin = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postLogin = (req, res, next) => {
  session = req.session;
  const { email, password } = req.body;
  const loginDetails = {
    email: email,
    password: password,
  };

  axios
    .post(process.env.URL + '/cookchef/v1/login', loginDetails)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        session.email = response.data.email;
        session.logged = response.data.logged;
        session.token = response.data.token;
        res.render('chef_page', {
          path: '/chef_page',
          pageTitle: 'Chef Page - Cook Food Chef',
          message: 'Login successful! Welcome to the Chef Page.',
          session: session,
        });
      } else {
        res.render('error', {
          path: '/error',
          pageTitle: 'Error - Cook Food Chef',
          errorMessage: 'Login failed. Invalid credentials.',
        });
      }
    })
    .catch(error => {
      console.error('Error during login:', error.message);
      res.render('error', {
        path: '/error',
        pageTitle: 'Error - Cook Food Chef',
        errorMessage: 'Login failed. Please try again later.',
      });
    });
};
