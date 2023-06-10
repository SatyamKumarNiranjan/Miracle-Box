
import mongoose from "mongoose"

const sessionschema = new mongoose.Schema({
    name:String,
    type:String,
    motive:String,
    locality:String,
    date:String
});


const Session=new mongoose.model("sessions",sessionschema);
  module.exports = Session;