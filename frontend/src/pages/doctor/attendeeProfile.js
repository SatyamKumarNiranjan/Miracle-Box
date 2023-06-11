import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const AttendeeProfile = () => {    
  const Navigate = useNavigate()
  const [attendee, setAttendee] = useState(null); // Initialize attendee as null
  const { id } = useParams();    
  const { user } = useSelector((state) => state.user);

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
  };  

  useEffect(() => {
    getAttendeeInfo(); 
  }, []);

  return ( 
    <Layout>
      {attendee && <div className="profile-container">
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
          <p>
            <strong>No. of Session Attended:</strong> {attendee.sessionsAttended.length}
          </p>  
          {user.isVolunteer && 
          <button className="m-1 btn btn-primary" onClick = {()=> Navigate(`/doctor/updateProfile/${id}`)}>Update</button> 
          } 
          {user.isAdmin && 
          <button className="mt-1 btn btn-primary" onClick = {()=> Navigate(`/admin/sessionAttended/${attendee._id}`)}>See Sessions Attended</button> 
          } 

        </div>
      </div>
      }
    </Layout>
  );
}

export default AttendeeProfile;
