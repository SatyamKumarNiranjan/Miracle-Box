const doctorModel = require('../models/doctorModel');  
// const volunteerModel = require('../models/volunteerModel');  
const express = require("express");
const authRouter = express.Router();
const accountSid = "ACb7a805cc1a59984045e8b9cc70faf5cb";
const authToken = "da91aae23ca8b922e9fe80f36284b0be";
const client = require("twilio")(accountSid, authToken); 
const jwt = require("jsonwebtoken");
 const getAttendeesInfoController = async(req,res) => {
    try {
        const doctor = await doctorModel.find({});   
        console.log()
        res.status(200).send({
            success:true, 
            message : "doctor data fetch success" , 
            data : doctor , 
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success:false, 
            error, 
            message: 'Error in Fetching Doctor Details'
        })
    }
};  

const getSearchedAttendeeController = async(req,res) => { 
    console.log("Controler")
    try { 
        const { phone } = req.body;
    const doctors = await doctorModel.find({ phone: phone });
        console.log()
        res.status(200).send({
            success:true, 
            message : "Searched Attendee fetch success" , 
            data : doctors , 
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success:false, 
            error, 
            message: 'Error in searxching attendee Details'
        })
    }
}; 
     
let OTP ; 
const sendOtpController = async(req,res) => { 
    console.log("pahuch raha h ")
    try { 
        const { number } = req.body.phone;
        const doctor = await doctorModel.find({number});   
        if(!doctor){
            return res
        .status(400)
        .json({ msg: "User with same number does not exists!" });
        } 
        
        let digits = "0123456789";
        OTP = "";
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
    
        client.messages
    .create({
                from: '+13613154187',
        to: '+919555049848'
    })
    .then(message => console.log(message.sid))
    // .done();
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
};   
const verifyOtpController = async(req , res)=>{
    try {
        const { otp } = req.body;
        if (otp != OTP) {
          return res.status(400).json({ msg: "Incorrect Otp." });
        }
        // // user = await user.save();
        // const token = jwt.sign({ id: user._id }, "passwordKey");
        // res.status(200).json({ token, ...user._firstName });
        OTP = "";
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
}
    
const updateProfileController = async(req , res) =>{
    try { 
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId } , req.body) 
        res.status(201).send({
            success:true ,
            message: 'Doctor Profile Updated',  
            data : doctor , 
        })
        
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success:false,
            message: 'Doctor Profile Update issue',   
            error,
        }); 
    }
} 

const getDoctorByIdController = async(req,res) =>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId}) 
        res.status(200).send({ 
            success:true, 
            message:'Single Doc info Fetched', 
            data: doctor, 
        })
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success:false, 
            error, 
            message:'Error in single Doctor Info'
        })
    }
}
module.exports = {getAttendeesInfoController ,getSearchedAttendeeController , verifyOtpController , sendOtpController, updateProfileController , getDoctorByIdController} ;  