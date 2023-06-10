import React , {Component, useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
const  Line =()=> {
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
      const age = [];
      const name = [];

      axios.get("/api/v1/doctor/getAttendeesInfo" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }).then(response =>{
          console.log("response", response)
          response.data.data.map(item => {
            console.log("item", item)
              age.push(item.age);
              name.push(item.firstName)
          })
          setCategory(name)
          setData(age)
          
         // console.log("age", age, name)
      }).catch(e => {
          alert(e);
      })
  }, [])
  
    return (
      <Chart options={{
        chart: {
          id: 'line'
        },
        xaxis: {
          categories: category
        }
      }} 
      series={[{
        name: 'age',
        data: data
      }]} type="bar" width='40%' height='20%' />
    )
}

export default Line;