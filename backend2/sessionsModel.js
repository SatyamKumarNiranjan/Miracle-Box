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
  attendees: {
    type: Array,
    default : []
  },
  community: {
    type: Array,
    default : []
  }
});

const sessionModel = mongoose.model('sessions', sessionSchema);

export default sessionModel;