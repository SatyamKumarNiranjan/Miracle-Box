const express = require('express') 
const router =  express.Router() 
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfileController, getDoctorByIdController, getAttendeesInfoController } = require('../controllers/doctorCtrl');


//Get All Volunteer Info 

router.get('/getAttendeesInfo' , authMiddleware , getAttendeesInfoController) ; 

// Post update profile updateProfile

router.post('/updateProfile' , authMiddleware , updateProfileController);   

// POST GET SINGLE DOC INFO 

router.post('/getDoctorById' , authMiddleware , getDoctorByIdController);
module.exports = router;
