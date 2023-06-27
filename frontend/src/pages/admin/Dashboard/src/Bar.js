import React , {Component, useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
const  Line =()=> {
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])

  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    (async () => {
      let userData;
      try {
        const res = await axios.get("/api/v1/user/getAllSessions" , {
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


const countGenders = () => {
    const genderCount = {
      male: 0,
      female: 0,
      other:0
    };

    users.forEach(person => {
      if (person.type === 'Education') {
        genderCount.male++;
      } else if (person.type === 'Awareness') {
        genderCount.female++;
      }
      else if (person.type === 'Health') {
        genderCount.other++;
      }
    });

    return genderCount;
  };

  const genderCount = countGenders();

{console.log(genderCount.male)}
{console.log(genderCount.other)}

  
    return (
      <Chart options={{
        chart: {
          id: 'line'
        },
        xaxis: {
          categories: ['January','February','March','April','May','June','July','August','September','October','November','December']
        }
      }} 
      series={[{
        name: 'Sessions',
        data: [5,3,4,2,5,users.length]
      }]} type="bar" width='80%' height='25%' />
    )
}

export default Line;