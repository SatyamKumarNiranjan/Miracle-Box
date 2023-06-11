const express = require('express') 
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, changeAccountStatusController, getAllVolunteerController, createSessionController, createCommunityController, getAllCommunityController } = require('../controllers/adminCtrl');
const router = express.Router()

//Get Mehod || users 
router.get('/getAllUsers' , authMiddleware , getAllUsersController); 

//Get Mehod || users 
router.get('/getAllDoctors' , authMiddleware , getAllVolunteerController);  

//Post account status 

router.post('/changeAccountStatus' , authMiddleware , changeAccountStatusController) 

// Create Session 
router.post("/createSession",authMiddleware,createSessionController);  

router.get('/getAllCommunity' , getAllCommunityController);  


// Create Community
router.post("/createCommunity",authMiddleware,createCommunityController); 

module.exports = router 