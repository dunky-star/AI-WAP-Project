let session = require('express-session');
const { postLogin, postRegister } = require('../services/userService');
const errorTemplate = require('../templates/errorTemplate');
const successTemplate = require('../templates/successTemplate');
const messages = require('../utilities/messages');
const isEmpty = require('../utilities/util');
const {
  validateLogin,
  validateRegistration,
} = require('../validation/validation');

const getHomeHandler = (req, res) => {
  session = req.session;
  return successTemplate(res, 'home', 'Home', null, session);
};

const getLoginHandler = (req, res) => {
  session = req.session;
  successTemplate(res, 'login', 'Login', null, session);
};

const getRegisterHandler = (req, res) => {
  session = req.session;
  return successTemplate(res, 'register', 'Register', null, session);
};

const getAboutHandler = (req, res) => {
  session = req.session;
  return successTemplate(res, 'about', 'About', null, session);
};

const getLogOutHandler = (req, res) => {
  req.session.destroy(null);
  session = 'undefined';
  return successTemplate(res, 'home', 'Home', null, session);
};

const postLoginHandler = async (req, res) => {
  try {
    session = req.session;
    const errors = validateLogin(req.body);
    if (isEmpty(errors)) {
      const result = await postLogin(req.body);
      session.name = result.data.result.firstName;
      session.logged = result.data.logged;
      session.token = result.data.token;
      return successTemplate(res, 'home', 'Home', result.data.message, session);
    } else {
      errorTemplate(
        req,
        res,
        'login',
        'Login',
        messages.failed_login,
        errors,
        session
      );
    }
  } catch (e) {
    console.log(e.response.data.error);
    return errorTemplate(
      req,
      res,
      'login',
      'Login',
      e.response.data.error.message,
      'undefined',
      'undefined'
    );
  }
};

const postRegisterHandler = async (req, res) => {
  try {
    session = req.session;
    const errors = validateRegistration(req.body);
    if (isEmpty(errors)) {
      // call the backend
      const result = await postRegister(req.body);
      return successTemplate(
        res,
        'login',
        'Login',
        messages.successful_registration,
        session
      );
    } else {
      return errorTemplate(
        req,
        res,
        'register',
        'Registeration',
        messages.failed_registration,
        errors
      );
    }
  } catch (e) {
    return errorTemplate(
      req,
      res,
      'register',
      'Registration',
      messages.failed_registration
    );
  }
};

module.exports = {
  getHomeHandler,
  getLoginHandler,
  getRegisterHandler,
  getAboutHandler,
  getLogOutHandler,
  postLoginHandler,
  postRegisterHandler,
};
