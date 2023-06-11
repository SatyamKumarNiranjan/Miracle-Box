import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb+srv://satyamkumarniranjan0786:9555049848@cluster0.hjwsqfh.mongodb.net/ms',{
useNewUrlParser:true,
useUnifiedTopology:true
}
);

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default : ""
  }, 
  timings: {
    type: Object,
    required: [true, "session timing is required"],
  },
  date: {
    type: Date,
    required: true
  }, 
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  attendees: {
    type: Array,
    default : []
  },
  community: {
    type: Array,
    default : []
  }
});


const Session=new mongoose.model("sessions",sessionSchema);



  app.get("/sessions1", (req, res) => {
    const limit = parseInt(req.query.results) || 5;
    Session.find()
      .sort({ date: 1 })
      .limit(limit) 
      .then(sessions => {
        res.json(sessions);
      })
      .catch(error => {
        res.status(500).json({ error: "Internal server error" });
      });
  });
  


  app.listen(9002,()=>{
      console.log("started at port 9002");
  })
