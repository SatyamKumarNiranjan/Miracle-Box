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
  

  return (
    <Layout className="App">
      <h1>DASHBOARD</h1>
 {/* {console.log(benefit)} */}
      {/* <h1>Count of Males: {genderCount.male}</h1> */}
      {console.log(users)}
      <h2>Some Calculated data</h2>
      <div className="cards-container">

        {/* To show total number of registered users */}
        
        <Card title="Registered Users" length={users.length} male={genderCount.male} female={genderCount.female}/>
        <Card1 title="Sessions Conducted" length={users.length}/>
        <Card2 title="Lives Impacted" length={users.length} benefit={impact.Benefit} NotBenefit={impact.NotBenefit}/>
        <Card3 title="Communities Covered" length={users.length}/>
      </div>
      <div>
      <h1>Graph Stats</h1>
      <div>
       <Line/>
       <Bar/>
       <Doughnut/> 
       <Pie/>
      </div>
      </div>
     </Layout>
  );
}

export default App;

