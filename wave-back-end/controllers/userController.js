const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const { findUser, saveUser } = require('../db/db');
const { appErr, AppErr } = require('../other-errors/appErr');
const generateToken = require('../utils/generateToken');

exports.userRegistration = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr('User Already Exist', 500));
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr('Invalid login credentials'));
    }
    //verify password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      if (!userFound) {
        return next(appErr('Invalid login credentials'));
      }
    }

    res.json({
      status: 'success',
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

exports.postUserReview = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);

    //Create the review
    const reviewCreated = await Review.create({
      title,
      description,
      user: author._id,
    });
    //Associate user to a review -Push the review into the user reviews field
    author.reviews.push(reviewCreated);
    //save
    await author.save();
    res.json({
      status: 'success',
      data: reviewCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

exports.getUserReviews = async (req, res, next) => {};

exports.resetPassword = async (req, res, next) => {};
