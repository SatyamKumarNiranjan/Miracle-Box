import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendeeSession = () => {   
    const [sessions, setSessions] = useState([]);  
    const [attendee, setAttendee] = useState(null);
    const { id } = useParams() ; 
    // console.log(id)
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
        console.log(sessions)
      } 
       
      const getAttendeeInfo = async () => { 
        try {
          const res = await axios.post(
            "/api/v1/doctor/getDoctorById", 
            { userId: id },
          );
          if (res.data.success) {
            setAttendee(res.data.data);
          }
        } catch (error) {
          console.log(error);
        } 
        console.log(attendee)
      };   
      useEffect(() => {
        getSessions(); 
        getAttendeeInfo()
      },[]);  
      // const attendedSessions = sessions.filter(session => attendee.sessionsAttended.includes(attendee.sessionsAttended.sessionId));  

      // console.log(attendedSessions)
  return (
    <Layout>
      
    </Layout>
  )
}

export default AttendeeSession
