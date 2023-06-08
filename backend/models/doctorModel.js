const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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
    aadhar: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },  
    fatherName: {
      type: String,
      required: [true, "Father Name is required"],
    }, 
    motherName: {
      type: String,
      required: [true, "Mother Name is required"],
    },  
    maritalStatus: {
      type: String,
      required: [true, "Marital Status is required"],
    },  
    pastMajorInjury: {
      type: String,
      required: [true, "Past Major Injury is required"],
    },   
    existingIllness: {
      type: String,
      required: [true, "Existing Illness is required"],
    },   
    allergies: {
      type: String,
      required: [true, "Allergies is required"],
    },  
    bloodGroup: {
      type: String,
    },  
    children: {
      type: String,
    }, 
    age: {
      type: Number,
      required: [true, "Age is require"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is require"],
    }, 
    childEducation: {
      type: String,
      required: [true, "Child Education is require"],
    }, 
    sessionsAttended:{
      type:Array, 
      default: [],
    },
    sessionAttendance: {
      type: Boolean,
      default: false,
    },
    isBenefitted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Level 0",
    },
    sessionId: {
      type: String,
      required: [true, "Session Id is require"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;