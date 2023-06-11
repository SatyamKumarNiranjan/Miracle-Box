const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  }, 
  state: {
    type: String,
    required: [true, "state is required"],
  },
  district: {
    type: String,
    required: [true, "district is required"],
  },
  description: {
    type: String,
    default : "",
  },
  attendees: {
    type:Array, 
    default: [], 
  }, 
  sessions:{
    type:Array, 
    default: [],
  }, 
});

const communityModel = mongoose.model("community", communitySchema);

module.exports = communityModel;