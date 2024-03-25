const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const registerController = require('../controllers/registerCtrl');

router.get('/login', registerController.getRegister);

router.post('/register', registerController.postRegister);

module.exports = router;
