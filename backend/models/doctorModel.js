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
      default: "",
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      // required: [true, "email is required"],
    }, 
    gender: {
      type: String,
      required: [true, "gender is required"],
    }, 
    income: {
      type: String,
      required: [true, "income is required"],
    }, 
    community: {
      type: String,
      required: [true, "community is required"],
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
      default: "",
    }, 
    motherName: {
      type: String,
      default: "",
    },  
    maritalStatus: {
      type: String,
      required: [true, "Marital Status is required"],
    },  
    pastMajorInjury: {
      type: String,
      default: "",
    },   
    existingIllness: {
      type: String,
      default: "",
    },   
    allergies: {
      type: String,
      default: "",
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
      // required: [true, "Qualification is require"],
    }, 
    childEducation: {
      type: String,
      // required: [true, "Child Education is require"],
    }, 
    sessionsAttended:{
      type:Array, 
      default: [],
    },
    status: {
      type: String,
      default: "Level 0",
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;