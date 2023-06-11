import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const AttendeeProfile = () => {   
  const [attendee, setAttendee] = useState(null);
  const {id} = useParams(); 
  const getAttendeeInfo = async () => { 
    console.log(id)
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
  };  
  console.log(attendee)
  useEffect(() => {
    getAttendeeInfo(); 
  }, []); 
  console.log(attendee)
  return (
    <Layout>
     <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {attendee.firstName} {attendee.lastName}
        </p>
        <p>
          <strong>Phone:</strong> {attendee.phone}
        </p>
        <p>
          <strong>Address:</strong> {attendee.address}
        </p>
        <p>
          <strong>Email:</strong> {attendee.email}
        </p>
        <p>
          <strong>Age:</strong> {attendee.age}
        </p>
        <p>
          <strong>Gender:</strong> {attendee.gender}
        </p>
        <p>
          <strong>Marital Status:</strong> {attendee.maritalStatus}
        </p>
        <p>
          <strong>Children:</strong> {attendee.children}
        </p>
        <p>
          <strong>Community:</strong> {attendee.community}
        </p>
      </div>
    </div>
    </Layout>
  )
}

export default AttendeeProfile
