import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
// import doctorModel from '../../../../backend/models/doctorModel';

const Attendance = () => {  
  const dispatch = useDispatch(); 
  const [users , setUsers] = useState([]);   
  const { sessionId } = useParams();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search query change
  const handleInputChange = (event) => {  
    setQuery(event.target.value);
  };
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/getAttendeesInfo" , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}` ,
        },
      }); 
      if(res.data.success){ 
        setUsers(res.data.data); 
      }
    } catch (error) {
      console.log(error)
    }
  } 
  useEffect(() => {
    getUsers();
  },[]); 
  console.log(users)
  // Function to handle search form submission 
  const handleSearch = () => {
    const results = users.filter((user) => user.phone === query); 
    setSearchResults(results);
  };  
  const handleMarkAttendance = async(attendeeId)=>{
      // console.log(userId);   
      console.log(sessionId)
      try {
        const res  = await axios.post('/api/v1/doctor/markAttendance' , {
          SessionId:sessionId , AttendeeId : attendeeId},
          ) 
          if (res.data.success){
            message.success(res.data.message) ;  
          }
      } catch (error) {
        message.error('Something Went Wrong')
      }
  } 
  const renderUsers = () => {
    return searchResults.map(user => (
      <tr key={user._id}>
        <td>{user.firstName}</td>
        <td>{user.phone}</td> 
        <td>{user.address}</td> 
        <div className="d-flex">
           <button className="btn btn-primary" onClick = {() => handleMarkAttendance(user._id)}>Mark</button>
         </div>
      </tr>
    ));
  };
  
  // console.log(searchResults) 
  return ( 
    
    <Layout> 
      {/* <form onSubmit={handleSearch}> */}
      <input type="text" className ="m-2 w-50 h-15"value={query} onChange={handleInputChange}  placeholder='Input Attendee Mobile Number'/>
        <button type="submit" className="m-2 w-25 btn btn-primary" onClick={handleSearch}>Search</button> 
      
        {searchResults.length > 0 && (
        <div>
          <h2 className='m-2'>List with {query} phone</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {renderUsers()}
            </tbody>
          </table>
        </div>
      )}

    </Layout>
  );
};

export default Attendance;
