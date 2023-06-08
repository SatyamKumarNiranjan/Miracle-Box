const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    }, 
    gender: {
      type: String,
      required: [true, "gender is required"],
    }, 
    age: {
      type: Number,
      required: [true, "Age is require"],
    },
    aadhar: {
      type: String, 
      required: [true, "aadhar is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },  
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
    },  
    pastExperience: {
      type: String,
      required: [true, "Past experience is required"],
    }, 
    occupation:{
      type: String,
      required: [true, "Occupation is required"],
    }, 
    status:{
      type : String, 
      default : "pending",
    }, 
    notifications:{
      type : Array, 
      default : [],
    },
    sessions:{
      type : Array, 
      default : [],
    }
}) 

const volunteerModel = mongoose.model("volunteer", volunteerSchema);

module.exports = volunteerModel;