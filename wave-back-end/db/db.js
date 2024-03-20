require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Disconnect from MongoDB
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Find a user in the database
const findUser = async query => {
  try {
    return await User.findOne(query).exec();
  } catch (error) {
    console.error('Error finding user:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Save a new user to the database
const saveUser = async newUser => {
  try {
    return await newUser.save();
  } catch (error) {
    console.error('Error saving user:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

module.exports = { connect, disconnect, findUser, saveUser };
