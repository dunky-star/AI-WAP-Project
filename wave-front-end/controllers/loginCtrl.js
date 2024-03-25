const axios = require('axios');

exports.getLogin = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postLogin = (req, res, next) => {
  let details = {
    email: req.body.email,
    password: req.body.password,
  };

  axios
    .post(process.env.URL + '/cookchef/v1/login', details, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
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
