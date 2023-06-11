import Layout from "../../components/Layout";
import React , {useEffect , useState} from 'react' 
import { Table } from 'antd';  
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";

const Sessions = () => {  
  const { user } = useSelector((state) => state.user);
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
        {user.isAdmin && 
           <button className="m-1 btn btn-primary" onClick = {handleProfile}>View</button> 
        } 
        {user.isVolunteer && 
           <button className="m-1 btn btn-primary" onClick = {()=> Navigate(`/attendance/${session._id}`)}>Update Attendance</button>  
        }
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
        {user.isAdmin &&  
          <button className="m-2 btn btn-primary" style={{ marginLeft: 'auto' }} onClick = {()=> Navigate(`/admin/sessions`)}>Create Session</button>
        } 
        <h1 className='m-2'>Sessions List</h1> 
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
