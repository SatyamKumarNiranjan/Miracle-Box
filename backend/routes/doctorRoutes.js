const express = require('express') 
const router =  express.Router() 
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfileController, getDoctorByIdController, getAttendeesInfoController, getSearchedAttendeeController, markAttendanceController } = require('../controllers/doctorCtrl');


//Get All Volunteer Info 

router.get('/getAttendeesInfo' , authMiddleware , getAttendeesInfoController) ; 
// Get all searched required User 
router.post('/getSearchedAttendee'  , getSearchedAttendeeController) ;  
// Send Otp 

// Post update profile updateProfile

router.post('/updateProfile' , authMiddleware , updateProfileController);   

// POST GET SINGLE DOC INFO

router.post('/getDoctorById' ,  getDoctorByIdController);  

//  Mark Attwendance  
router.post('/markAttendance' ,  markAttendanceController); 
// Post Session info 
//Apply Doctor || POST
module.exports = router;
