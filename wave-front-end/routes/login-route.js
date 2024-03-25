const express = require('express');
const router = express.Router();
const axios = require('axios');
const loginController = require('../controllers/loginCtrl');
require('dotenv').config();

router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

module.exports = router;
