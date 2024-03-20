const express = require('express');
const router = express.Router();
const cookChefController = require('../controllers/cookChefController');

router.post('/cookchef/v1/meals', cookChefController.createHealthyMeals);

module.exports = router;
