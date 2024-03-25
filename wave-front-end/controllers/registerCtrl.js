exports.getRegister = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postRegister = async (req, res, next) => {
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
};
