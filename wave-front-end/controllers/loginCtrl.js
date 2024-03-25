exports.getLogin = (req, res, next) => {
  res.render('login', { path: '/login', pageTitle: 'Login - Cook Food Chef' });
};

exports.postLogin = async (req, res, next) => {
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
};
