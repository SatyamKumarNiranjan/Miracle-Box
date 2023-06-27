import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendeeSession = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]); 
  const [name , Setname] = useState("")
  const [attendee, setAttendee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (sessions.length === 0 && attendee === null) {
      const fetchData = async () => {
        try {
          const sessionRes = await axios.get('/api/v1/user/getAllSessions', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (sessionRes.data.success) {
            setSessions(sessionRes.data.data);
          }

          const attendeeRes = await axios.post('/api/v1/doctor/getDoctorById', {
            userId: id,
          });

          if (attendeeRes.data.success) {
            setAttendee(attendeeRes.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [id, sessions.length, attendee]);

  useEffect(() => {
    if (attendee && attendee.sessionsAttended) {
      const sessionArray = attendee.sessionsAttended;
      const filteredSessions = sessions.filter((session) =>
        sessionArray.find((obj) => obj.sessionId === session._id)
      );
      Setname(attendee.firstName)
      setFilteredSessions(filteredSessions);
    } 
    // console.log(filteredSessions);
  }, [sessions, attendee]);
  const rendersessions = () => { 
    
    return filteredSessions.map(session => (
        <tr key={session._id}> 
        <td>{session.name}</td>
        <td>{session.type}</td>
        <td>{new Date(session.date).toLocaleDateString()}</td>
        <td>{new Date(session.date).toLocaleTimeString()}</td>
        <td>{session.city}</td>  
        {/* <div className="d-flex"> 
        {user.isAdmin && 
           <button className="m-1 btn btn-primary" onClick = {handleProfile}>View</button> 
        } 
        </div>   */}
      </tr>
    ));
  }; 
  console.log(filteredSessions);
  return (
    <Layout>
{/*         
          <button className="m-2 btn btn-primary" style={{ marginLeft: 'auto' }} onClick = {()=> Navigate(`/admin/sessions`)}>Create Session</button>
        }  */}
        <h1 className='m-2'>Sessions attended by {name}</h1> 
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
  );
};

export default AttendeeSession;
