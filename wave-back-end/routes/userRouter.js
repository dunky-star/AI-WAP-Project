const express = require('express');
const userController = require('../controllers/userController');
const isLogin = require('../middlewares/isLogin');

const router = express.Router();

router.post('/cookchef/v1/register', userController.userRegistration);
router.post('/cookchef/v1/login', userController.userLogin);
router.post('/cookchef/v1/review', isLogin, userController.postUserReview);
router.get('/cookchef/v1/reviews', isLogin, userController.getUserReviews);
router.get('/cookchef/v1/resetpassword', userController.resetPassword);

module.exports = router;
