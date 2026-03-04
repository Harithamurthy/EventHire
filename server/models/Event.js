const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  date: {
    type: String,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['Photography', 'Catering', 'Music', 'Planning', 'Performance', 'Decoration', 'Videography', 'Other']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    default: [],
    set: function(val) {
      // Convert string to array if needed
      if (typeof val === 'string') {
        return val.split(',').map(item => item.trim()).filter(item => item.length > 0);
      }
      return val;
    }
  },
  contactPhone: {
    type: String
  },
  contactEmail: {
    type: String
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'cancelled'],
    default: 'active'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
