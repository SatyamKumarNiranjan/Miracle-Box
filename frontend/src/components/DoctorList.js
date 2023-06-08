import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => { 
    const navigate =  useNavigate(); 
  return (
    <>
      <div className='card m-2' style = {{cursor: 'pointer'}}onClick={()=> navigate(`/doctor/profile/${doctor._id}`)}> 
      <div className='card-header'>  
        Dr. {doctor.firstName} {doctor.lastName}
      </div> 
      <div className='card-body'>
        <p>
            <b>Gender</b> {doctor.gender} 
        </p>  
        <p>
            <b>Address</b> {doctor.address} 
        </p>  
        <p>
            <b>Session Attendance</b> {(doctor.sessionAttendance) === 1 ?  "Attended" : "NotAttended"}
        </p> 
        <p>
            <b>Sessions Id</b> {doctor.sessionId}
        </p> 
        <p>
            <b>Is Benefitted</b> {(doctor.isBenefitted) == 1 ?  "Yes" : "No"}
        </p>  
        <p>
            <b>Status</b> {doctor.status}
        </p> 
      </div>
      </div>
    </>
  )
}

export default DoctorList
