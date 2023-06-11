import React from 'react'
import Layout from '../../../../components/Layout'

import { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./SocialCard";
 import Line from "./Line";
 import axios from "axios";
import  Card  from './Card';
import  Card1  from './Card1';
import  Card2  from './Card2';
import  Card3  from './Card3';
import Doughnut from './Doughnut';
import Bar from './Bar';
import Pie from './Pie'

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  //Recent fetch from attendee schema
  useEffect(() => {
    (async () => {
      let userData;
      try {
        const res = await axios.get("/api/v1/doctor/getAttendeesInfo" , {
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}` ,
          },
        }); 
        if(res.data.success){
          console.log(res.data.data); 
          userData=res.data.data;
        } 
        else{
          console.log("Error aa rahi h "); 
        }
      }catch (error) {
        console.log(error);
        userData = [];
      }

      // setAllUsers(userData.results);
      console.log(userData);
      {console.log("dsf")}
      setUsers(userData);

    })();
  }, []);
//count for genders
  const countGenders = () => {
    const genderCount = {
      male: 0,
      female: 0
    };

    users.forEach(person => {
      if (person.gender === 'male') {
        genderCount.male++;
      } else if (person.gender === 'female') {
        genderCount.female++;
      }
    });

    return genderCount;
  };

  const genderCount = countGenders();


  //count for isBenefitted
  const  isBenefitted= () => {
    const impact = {
      Benefit: 0,
      NotBenefit: 0
    };

    users.forEach(person => {
      if (person.isBenefitted === true) {
        impact.Benefit++;
      } else if (person.isBenefitted === false) {
        impact.NotBenefit++;
      }
    });

    return impact;
  };

  const impact = isBenefitted();
  
//fetch from sesseion api



const [session, setSession] = useState([]);
useEffect(() => {
  (async () => {
    let sessionData;
    try {
      const res = await axios.get("/api/v1/user/getAllSessions" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }); 
      if(res.data.success){
        console.log(res.data.data); 
        sessionData=res.data.data;
      } 
      else{
        console.log("Error aa rahi h "); 
      }
    }catch (error) {
      console.log(error);
      sessionData = [];
    }

    // setAllUsers(sessionData.results);
    console.log(sessionData);
    {console.log(session)}
    setSession(sessionData);

  })();
}, []);


//communities api


const [community, setCommunity] = useState([]);
useEffect(() => {
  (async () => {
    let communityData;
    try {
      const res = await axios.get("/api/v1/user/getAllSessions" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }); 
      if(res.data.success){
        console.log(res.data.data); 
        communityData=res.data.data;
      } 
      else{
        console.log("Error aa rahi h "); 
      }
    }catch (error) {
      console.log(error);
      communityData = [];
    }

    // setAllUsers(communityData.results);
    console.log(communityData);
    {console.log(community)}
    setSession(communityData);

  })();
}, []);

//fetch from all users

const [udata, setU] = useState([]);
useEffect(() => {
  (async () => {
    let uData;
    try {
      const res = await axios.get("/api/v1/user/getAllSessions" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }); 
      if(res.data.success){
        console.log(res.data.data); 
        uData=res.data.data;
      } 
      else{
        console.log("Error aa rahi h "); 
      }
    }catch (error) {
      console.log(error);
      uData = [];
    }

    // setAllUsers(uData.results);
    console.log(uData);
    {console.log(udata)}
    setU(setU);

  })();
}, []);



  return (
    <Layout className="App">
      <h1>DASHBOARD</h1>
 {/* {console.log(benefit)} */}
      {/* <h1>Count of Males: {genderCount.male}</h1> */}
      {console.log(users)}
      <h2>Some Calculated data</h2>
      <div className="cards-container">

        {/* To show total number of registered users */}
        
        <Card title="Recent Session Total Registered Users" length={users.length} male={genderCount.male} female={genderCount.female}/>
        <Card1 title="Sessions Conducted Till Now" length={session.length}/>
        <Card2 title="Lives Impacted" length={users.length} benefit={impact.Benefit} NotBenefit={impact.NotBenefit}/>
        <Card3 title="Communities Covered" length={community.length}/>
      </div>
      <div>
      <h1>Graph Stats</h1>
      <div>
       <Line/>
       <h1>Sessions per Month</h1>
       <Bar/>
       <Doughnut/> 
       {/* <h1>Sessions and types of session</h1> */}
       <Pie/>
      </div>
      </div>
     </Layout>
  );
}

export default App;

