const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Review description is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please user is required'],
  },
});

module.exports = mongoose.model('Review', reviewSchema);
