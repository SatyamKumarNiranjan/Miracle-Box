const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  }, 
  isAdmin:{
    type:Boolean, 
    default:false,
  }, 
  isVolunteer:{
    type:Boolean, 
    default:false,
  },  
  isAttendee:{
    type:Boolean, 
    default:false,
  }, 
  notification: {
    type:Array, 
    default: [], 
  }, 
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;