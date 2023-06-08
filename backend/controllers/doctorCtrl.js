const doctorModel = require('../models/doctorModel');  
// const volunteerModel = require('../models/volunteerModel');
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
module.exports = {getAttendeesInfoController , updateProfileController , getDoctorByIdController} ;  