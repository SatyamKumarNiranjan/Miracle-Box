const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default : ""
  }, 
  timings: {
    type: Object,
    required: [true, "session timing is required"],
  },
  date: {
    type: Date,
    required: true
  }, 
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    level: {
      type: Number,
    },
  }],
  
  
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    // required: true
  }
});

const sessionModel = mongoose.model('sessions', sessionSchema);

module.exports = sessionModel;