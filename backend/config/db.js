const mongoose = require('mongoose') 
// const colors = require('colors') 

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI) 
        console.log(`Mongodb connected ${mongoose.connection.host}`); 
    } catch (error) {
        console.log(`mongodb Server Issue ${error}`); 
    }
}; 

module.exports = connectDB;  