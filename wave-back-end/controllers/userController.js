const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { findUser, saveUser } = require('../db/db');
const errorTemplate = require('../other-errors/errorTemplate');

exports.userRegistration = async (req, res, next) => {
  try {
    const existingUser = await findUser({ email: req.body.email });

    if (existingUser) {
      throw new Error('User already exists. Please log in.');
    } else {
      const newUser = new User(req.body);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const savedUser = await saveUser(newUser);

      return res.status(201).json({
        message: 'Successful Registration',
        result: savedUser.toObject(), // Convert Mongoose document to plain JavaScript object
      });
    }
  } catch (error) {
    return errorTemplate(res, error, error.message);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const loggedUser = await findUser({ email: req.body.email });

    if (!loggedUser) {
      throw new Error('Authentication Failed: Unable to find user');
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      loggedUser.password
    );

    if (passwordMatch) {
      const userPayload = { _id: loggedUser._id, email: loggedUser.email };
      const token = jwt.sign({ user: userPayload }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(200).json({
        result: { email: loggedUser.email, _id: loggedUser._id },
        token: token,
        message: 'Login Successful',
      });
    } else {
      throw new Error(
        'Authentication failed: Email or password does not match'
      );
    }
  } catch (error) {
    return errorTemplate(res, error, error.message);
  }
};

exports.postUserReview = async (req, res, next) => {};

exports.getUserReviews = async (req, res, next) => {};

exports.resetPassword = async (req, res, next) => {};
