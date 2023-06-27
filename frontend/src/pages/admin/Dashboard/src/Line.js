// import React , {Component, useState, useEffect} from 'react';
// import axios from 'axios';
// import Chart from 'react-apexcharts'
// const  Line =()=> {
//   const [category, setCategory] = useState([])
//   const [data, setData] = useState([])

//   useEffect(() => {
//       const age = [];
//       const name = [];

//       axios.get("/api/v1/doctor/getAttendeesInfo" , {
//         headers:{
//           Authorization : `Bearer ${localStorage.getItem('token')}` ,
//         },
//       }).then(response =>{
//           console.log("response", response)
//           response.data.data.map(item => {
//             console.log("item", item)
//               age.push(item.age);
//               name.push(item.firstName)
//           })
//           setCategory(name)
//           setData(age)
          
//          // console.log("age", age, name)
//       }).catch(e => {
//           alert(e);
//       })
//   }, [])
  
//     return (
//       <Chart options={{
//         chart: {
//           id: 'line'
//         },
//         xaxis: {
//           categories: category
//         }
//       }} 
//       series={[{
//         name: 'age',
//         data: data
//       }]} type="area" width='80%' height='25%' />
//     )
// }

// export default Line;


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
          categories: [0,'January','February','March','April','May','June','July','August','September','October','November','December']
        }
      }} 
      series={[{
        name: 'Attendees',
        data: [0,10,25,32,29,35,users.length]
      }]} type="area" width='80%' height='25%' />
    )
}

export default Line;