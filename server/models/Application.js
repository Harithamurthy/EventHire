const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  experience: {
    type: String,
    required: [true, 'Experience details are required']
  },
  price: {
    type: String,
    required: [true, 'Price quote is required']
  },
  availability: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    default: 'yes'
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  portfolio: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications
ApplicationSchema.index({ event: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
