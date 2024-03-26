const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
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
    res.status(200).json({
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

    res.status(200).json({
      status: 'success',
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        logged: true,
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

//all
exports.getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user');
    res.json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    res.json(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    //Check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //update user
      await User.findByIdAndUpdate(
        req.userAuth,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: 'success',
        data: 'Password has been changed successfully',
      });
    } else {
      return next(appErr('Please provide password field'));
    }
  } catch (error) {
    next(appErr(error.message));
  }
};
