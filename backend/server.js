 const express = require('express');
 const moragan = require('morgan');
 const dotenv = require('dotenv');
 const connectDB = require('./config/db');

 dotenv.config(); 
 const mongoose = require("mongoose");
 //mongodb config 
 connectDB(); 
 
 //rest object for express
 const app=express()
 
 
 
 //middlewares
 app.use(express.json());//to avoid error on parsing any json obj in the body
 app.use(moragan('dev'));
 
 
 //routes
 app.use("/api/v1/user" , require("./routes/userRoutes"));
 app.use("/api/v1/admin" , require("./routes/adminRoutes")); 
 app.use("/api/v1/doctor" , require("./routes/doctorRoutes"));
 const port= 8080;
  

 app.use(express.urlencoded());





//listen port
app.listen(port,()=>{
    console.log(
        `server is running in ${process.env.NODE_MODE} mode on port 8080`
    );
});