const express = require('express') 
const router =  express.Router() 
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfileController, getDoctorByIdController, getAttendeesInfoController, sendOtpController, verifyOtpController, getSearchedAttendeeController } = require('../controllers/doctorCtrl');


//Get All Volunteer Info 

router.get('/getAttendeesInfo' , authMiddleware , getAttendeesInfoController) ; 
// Get all searched required User 
router.post('/getSearchedAttendee'  , getSearchedAttendeeController) ;  
// Send Otp 

router.post('/sendOtp' , sendOtpController) ;  

// Verify Otp 
router.post('/verifyOtp' , verifyOtpController) ; 
// Post update profile updateProfile

router.post('/updateProfile' , authMiddleware , updateProfileController);   

// POST GET SINGLE DOC INFO

router.post('/getDoctorById' , authMiddleware , getDoctorByIdController); 

// Post Session info 
//Apply Doctor || POST
module.exports = router;
