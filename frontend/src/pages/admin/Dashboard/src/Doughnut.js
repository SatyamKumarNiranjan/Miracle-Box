import { useEffect, useState } from 'react';
import './App.css';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

function App() {
  const [data, setData] = useState({
    datasets: [{
        data: [10, 20, 30],
        backgroundColor:[
          'red',
          'blue',
          'yellow'
        ]
    },
  ],
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ], 
});
  useEffect(()=> {
    const fetchData = () =>  {
      fetch("/api/v1/doctor/getAttendeesInfo" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }).then((data) => {
        const res = data.json();
        return res
      }).
      then((res) => {
        console.log("resss", res)
        const label = [];
        const data = [];
        console.log("res",res);
        res.data.map(item => {
            console.log("item", item)
          //   const getAllProducts= async(req,res)=>{
          //     const myData= await item.find({});
          //     console.log("the data is\t",myData);
          // }
          
          //getAllProducts();
              label.push(item.firstName);
              data.push(item.age)
          })

        setData(
          {
            datasets: [{
                data:data,
                backgroundColor:[
                  'red',
                  'blue',
                  'yellow'
                ]
            },
          ],
          labels:label, 
        }
        )

      }).catch(e => {
        console.log("error", e)
      }) 
    }
  fetchData();
  }, [])
  // return (
  //   <div className="App" style={{width:'50%', height:'50%'}}>
     
  //     <Doughnut data={data}/>
  //   </div>
  // );

  return (
    <div className="MApp">
      <div className="ChartContainer">
        <Doughnut data={data} />
      </div>
    </div>
  );
  
}

export default App;
