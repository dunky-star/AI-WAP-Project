const { getToken } = require("../services/authStorage");

const isloggedInAlready = (req, res, next) => {

    console.log('Is logged in already??');

  if (hasToken()) {
    return res.redirect('/home');
  }
    next();
}

const hasToken = () => {
  if (getToken()) {
    console.log('Has Token:', getToken());
    return true;
  }
}

module.exports = isloggedInAlready;