const userModel = require("../models/userModel");
const sessionModel = require("../models/sessionsModel");
const volunteerModel = require("../models/volunteerModel");
const communityModel = require("../models/communityModel");
const getAllUsersController = async(req,res) =>{
    try { 
        const users = await userModel.find({}); 
        res.status(200).send({
            success:true , 
            message: 'users data' , 
            data : users, 
        }); 
    } catch (error) {   
        console.log(error) 
        res.status(500).send({
            success:false , 
            message:'error while fetching users' , 
            error,
        })
    }
};  
 

const getAllCommunityController = async(req,res) =>{
  try { 
      const community = await communityModel.find({}); 
      res.status(200).send({
          success:true , 
          message: 'Community data fetched successfully' , 
          data : community, 
      }); 
      // console.log(community)
      
  } catch (error) {   
      console.log(error) 
      res.status(500).send({
          success:false , 
          message:'error while fetching Community' , 
          error,
      })
  }
};  

const createSessionController = async(req , res) =>{
  try {
    const newSession = await sessionModel({ ...req.body });
    await newSession.save();
    res.status(201).send({
      success: true,
      message: "Session Created SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile creating a session",
    });
  }
}; 

const createCommunityController = async(req , res) =>{
    console.log("pahuch gya");
  try {
    const newCommunity = await communityModel({ ...req.body });
    await newCommunity.save();
    res.status(201).send({
      success: true,
      message: "Community Created SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While creating a Community",
    });
  }
};

const getAllVolunteerController = async(req,res) =>{
    try { 
        const volunteers = await volunteerModel.find({}); 
        res.status(200).send({
            success:true , 
            message: 'volunteers data' , 
            data : volunteers, 
        });
        
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success:false , 
            message:'error while fetching volunteers' , 
            error,
        })
    }
};  
//doctor account status 

const changeAccountStatusController = async(req,res) =>{ 
    try {
        const {volunteerId , status } = req.body 
        const volunteer = await volunteerModel.findByIdAndUpdate(volunteerId , {status}) 
        const user = await userModel.findOne({ _id : volunteer.userId })  
        // user.isVolunteer = "true"
        const notification = user.notification  
        notification.push({
            type:'volunteer-account-request-updated', 
            message:`Your volunteer Account Request Has Been ${status} ` , 
            onclickPath: '/notification' 
        }) 
        user.isVolunteer = status === "approved" ? true : false 
        await user.save() 
        res.status(201).send({
            success:true, 
            message: 'Account Status Updated' , 
            data: volunteer , 
        }) 

    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success:false , 
            message : 'Error in Account Status', 
            error
        }) 
    }

}; 

module.exports = { getAllUsersController , getAllCommunityController , createCommunityController , createSessionController , getAllVolunteerController , changeAccountStatusController}; 