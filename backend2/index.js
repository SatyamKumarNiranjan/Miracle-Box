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

const sessionschema = new mongoose.Schema({
    name:String,
    type:String,
    motive:String,
    locality:String,
    date:String
});


const Session=new mongoose.model("sessionscards",sessionschema);

app.post("/createsession", (req, res) => {
    const name = req.body.name;
    const locality = req.body.locality;
    const date = req.body.date;
    const type = req.body.type;
    const motive = req.body.motive;
  
  
        const newSession = new Session({
          name,
          type,
          motive,
          locality,
          date,
        });
  
        return newSession.save()
          .then(() => {
            res.send({ message: "Successfully Scheduled" });
          });
  });

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
