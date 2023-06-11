// import { useEffect, useState } from 'react';
// import './App.css';
// import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// ChartJs.register(
//   Tooltip, Title, ArcElement, Legend
// );

// function App() {
//   const [data, setData] = useState({
//     datasets: [{
//         data: [10, 20, 30],
//         backgroundColor:[
//           'red',
//           'blue',
//           'yellow'
//         ]
//     },
//   ],
//   labels: [
//       'Red',
//       'Yellow',
//       'Blue'
//   ], 
// });
//   useEffect(()=> {
//     const fetchData = () =>  {
//       fetch("" , {
//         headers:{
//           Authorization : `Bearer ${localStorage.getItem('token')}` ,
//         },
//       }).then((data) => {
//         const res = data.json();
//         return res
//       }).
//       then((res) => {
//         console.log("resss", res)
//         const label = [];
//         const data = [];
//         console.log("res",res);
//         res.data.map(item => {
//             console.log("item", item)
//               label.push(item.firstName);
//               data.push(item.age)
//           })

//         setData(
//           {
//             datasets: [{
//                 data:data,
//                 backgroundColor:[
//                   'red',
//                   'blue',
//                   'yellow'
//                 ]
//             },
//           ],
//           labels:label, 
//         }
//         )

//       }).catch(e => {
//         console.log("error", e)
//       }) 
//     }
//   fetchData();
//   }, [])
//   // return (
//   //   <div className="App" style={{width:'50%', height:'50%'}}>
     
//   //     <Doughnut data={data}/>
//   //   </div>
//   // );


  
//   return (
//     <div className="MApp">
//       {console.log("asdhjadsf",data)}
//       <div className="ChartContainer">
//         <Doughnut data={data} />
//       </div>
//     </div>
//   );
  
// }

// export default App;


import { useEffect, useState } from 'react';
import './App.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/v1/doctor/getAttendeesInfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          console.log(res.data.data);
          setUsers(res.data.data);
        } else {
          console.log('Error occurred');
        }
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    })();
  }, []);

  // const countGenders = () => {
  //   const genderCount = {
  //     male: 0,
  //     female: 0
  //   };

  //   users.forEach((person) => {
  //     if (person.income === 'More than 50,000') {
  //       genderCount.male++;
  //     } else if (person.income === 'Less than 50,000') {
  //       genderCount.female++;
  //     } 
  //   });

  //   return genderCount;
  // };

  // const genderCount = countGenders();
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
  

  const data = {
    datasets: [
      {
        data: [countI.less, countI.more],
        backgroundColor: ['#E8A9A9', '#C2DEDC'],
      },
    ],
    labels: ['Less than 50000', 'More than 50000'],
  };

  return (
    <div className="App1">
      <div className="ChartContainer1">
        <Doughnut
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Income Distribution',
                font: {
                  size: 25,
                  weight: 'bold',
                },
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (context) =>
                    ` ${context.parsed.toFixed(2)}`,
                },
              },
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        />
      </div>
      {console.log(users)}
      {/* {console.log(genderCount.male)} */}
    </div>
  );
}

export default App;

