const express = require('express');
const {
  validateRegistration,
  validateLogin,
} = require('../validation/validation');
const router = express.Router();
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');
const { postRegister, postLogin } = require('../services/userService');
let session = require('express-session');
require('dotenv').config();
const {
  getHomeHandler,
  getLoginHandler,
  getRegisterHandler,
  getAboutHandler,
  getLogOutHandler,
  postLoginHandler,
  postRegisterHandler,
} = require('../handlers/userHandler');

// use middlewwre to create express session
router.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  })
);

router.get('/', getHomeHandler);

router.get('/login', getLoginHandler);

router.post('/login', postLoginHandler);

router.get('/register', getRegisterHandler);

router.post('/register', postRegisterHandler);

router.get('/about', getAboutHandler);

router.get('/logout', getLogOutHandler);

module.exports = router;
