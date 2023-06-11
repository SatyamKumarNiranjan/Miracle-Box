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
import Card4 from './Card4'
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


//count income slabs
const countIncome = () => {
  const countI = {
    less: 0,
    more: 0
  };

  users.forEach(person => {
    if (person.income === 'Less than 50,000') {
      countI.less++;
    } else if (person.income === 'More than 50,000') {
      countI.more++;
    }
  });

  return countI;
};

const countI = countIncome();


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



const [community, setCommunity] = useState([]);

  const getAllCommunity = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllCommunity');
      if (res.data.success) {
        setCommunity(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout className="App">
      {/* <h1>DASHBOARD</h1> */}
      <h1 class="dashboard-title">DASHBOARD</h1>


 {/* {console.log(benefit)} */}
      {/* <h1>Count of Males: {genderCount.male}</h1> */}
      {console.log(users)}
      {/* <h2>Insights Achieved!!</h2> */}

      <h2 class="insights-title">Insights Achieved!!</h2>

      <div className="cards-container">

        {/* To show total number of registered users */}
        
        <Card title="Total Registered Users" length={users.length} male={genderCount.male} female={genderCount.female}/>
        <Card1 title="Sessions Conducted Till Now" length={session.length}/>
        <Card2 title="Lives Impacted" length={users.length} benefit={impact.Benefit} NotBenefit={impact.NotBenefit}/>
        {/* <Card3 title="Communities Covered" length={community.name}/> */}
        <Card4 title="Income Slabs" MoreI={countI.more} LessI={countI.less}/>
      </div>
      <div>
      {/* <h1>Stats & Figures</h1> */}

      <h1 class="stats-title">Stats &amp; Figures</h1>

      <div>
      {/* <h2>Attendee Per Month</h2> */}

      <h2 class="attendee-title">Attendee Per Month</h2>
       <Line/>
       {/* <h2>Sessions Per Month</h2> */}
       <h2 class="sessions-title">Sessions Per Month</h2>
       <Bar/>
       {/* <Doughnut/> 
       <Pie/> */}
       <div class="chart-container">
  <div class="chart">
    <Doughnut/>
  </div>
  <div class="chart">
    <Pie/>
  </div>
</div>

      </div>
      </div>
     </Layout>
  );
}

export default App;

