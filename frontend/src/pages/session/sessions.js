import Layout from "../../components/Layout";
import React , {useEffect , useState} from 'react' 
import { Table } from 'antd';  
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Sessions = () => { 
  const Navigate = useNavigate()
  const [sessions , setSessions] = useState([]);  
  
  const handleProfile =()=>{
    Navigate('/sessionInfo') 
    
  }
  const handleAttendance =(req,res)=>{ 
    Navigate(`/attendance/${req._id}`);
  }

  const rendersessions = () => { 
    
    return sessions.map(session => (
        <tr key={session._id}> 
        <td>{session.name}</td>
        <td>{session.type}</td>
        <td>{new Date(session.date).toLocaleDateString()}</td>
        <td>{new Date(session.date).toLocaleTimeString()}</td>
        <td>{session.city}</td>  
        <div className="d-flex">
           <button className="m-1 btn btn-primary" onClick = {handleProfile}>View</button> 
           <button className="m-1 btn btn-primary" onClick = {()=> Navigate(`/attendance/${session._id}`)}>View</button>
        </div> 
      </tr>
    ));
  }; 
  
  const getSessions = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllSessions" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }); 
      if(res.data.success){ 
        setSessions(res.data.data); 
      }
    } catch (error) {
      console.log(error)
    }
  } 
  useEffect(() => {
    getSessions();
  },[]); 
  
  // sessions = sessions.data ; 
    return (
      <Layout>
        <h1 className='m-2 text-center'>Sessions List</h1>
        <table className="table">
          <thead>
            <tr> 
            <th>Session Name</th> 
              <th>Session Type</th> 
              <th>Date</th>  
              <th>Time</th>  
              <th>City</th>  
              <th></th>  
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {rendersessions()}
          </tbody>
        </table>
      </Layout> 
    )
}

export default Sessions ; 
