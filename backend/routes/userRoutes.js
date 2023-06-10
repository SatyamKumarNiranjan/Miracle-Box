const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  applyVolunteerController,
  applyAttendeeController,
  getAllSessionsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData",authMiddleware,authController);

//Apply Doctor || POST
router.post("/apply-attendee",authMiddleware,applyAttendeeController); 

// Apply Volunteer || Post 

router.post("/apply-volunteer",authMiddleware,applyVolunteerController);

//Notification Doctor || POST
router.post("/get-all-notification",authMiddleware,getAllNotificationController);

//Notification Doctor || POST
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController); 

// GEt all doctor  
router.get('/getAllDoctors' , authMiddleware , getAllDoctorsController) 

// GEt all Sessions
router.get('/getAllSessions' , authMiddleware , getAllSessionsController) 
// Book Appointment 
router.post('/book-appointment' , authMiddleware , bookAppointmentController); 

module.exports = router;