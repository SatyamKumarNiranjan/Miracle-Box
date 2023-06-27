
import { useEffect, useState } from 'react';
import './App.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/v1/user/getAllSessions', {
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

  const countGenders = () => {
    const genderCount = {
      male: 0,
      female: 0,
      other: 0,
    };

    users.forEach((person) => {
      if (person.type === 'Education') {
        genderCount.male++;
      } else if (person.type === 'Awareness') {
        genderCount.female++;
      } else if (person.type === 'Health') {
        genderCount.other++;
      }
    });

    return genderCount;
  };

  const genderCount = countGenders();

  const data = {
    datasets: [
      {
        data: [genderCount.male, genderCount.female, genderCount.other],
        backgroundColor: ['#E8A9A9', '#C2DEDC', '#E1AEFF'],
      },
    ],
    labels: ['Awareness', 'Education', 'Health'],
  };

  return (
    <div className="App1">
      <div className="ChartContainer1">
        <Pie
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Session Distribution',
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
      {console.log(genderCount.male)}
    </div>
  );
}

export default App;
