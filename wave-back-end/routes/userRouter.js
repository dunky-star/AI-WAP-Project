const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/cookchef/v1/register', userController.userRegistration);
router.post('/cookchef/v1/login', userController.userLogin);

module.exports = router;
