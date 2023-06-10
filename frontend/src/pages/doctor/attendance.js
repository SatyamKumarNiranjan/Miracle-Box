// import React from "react";
// import Layout from "../../components/Layout";
// import axios from "axios";

// const sendOtp = async () => { 
//   try {
//     const res = await axios.post("/api/v1/doctor/sendOtp" , {
//       headers:{
//         Authorization : `Bearer ${localStorage.getItem('token')}` ,
//       },
//     })
//     if(res.data.success){
//       console.log("message has been sent successfully")
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }  
// const verifyOtp = async () => {
//   try {
//     const res = await axios.post("/api/v1/doctor/verifyOtp" , {
//       headers:{
//         Authorization : `Bearer ${localStorage.getItem('token')}` ,
//       },
//     }); 
//     if(res.data.success){
//       console.log("OTP has been verified successfully")
//     }
//   } catch (error) {
//     console.log(error)
//   }
// } 
// const Attendance = () => {
//   return (
//     <Layout>
//       <form className = "width 50"> 
//       <div className="row m-3 ">
//           <label for="inputMobile" className="col-sm-2 col-form-label">
//               Attendee Name
//           </label>
//           <div className="mt-2 col-sm-10">
//             <input type="fi" className="form-control" id="inputEmail3" />
//           </div>
//         </div> 
//         <div className="row m-3">
//           <label for="inputMobile" className="col-sm-2 col-form-label">
//               Phone No.
//           </label>
//           <div className="col-sm-10">
//             <input type="phone" className="form-control" id="inputEmail3" />
//           </div>
//         </div> 
//         <button type="submit" className=" mt-2 m-5 btn btn-primary" onClick={sendOtp}>
//           Send OTP
//         </button>  
//         </form>
//         <form className = "width 50">
//         <div className="row m-3">
//           <label for="inputOtp" className="col-sm-2 col-form-label">
//             Otp
//           </label>
//           <div className="col-sm-10">
//             <input
//               type="password"
//               className="form-control"
//               id="inputPassword3"
//             />
//           </div>
//         </div>
        
//         <button type="submit" className="mt-2 m-5 btn btn-primary" onSubmit={verifyOtp}>
//           Verify
//         </button>
//       </form>
//     </Layout>
//   );
// };

// export default Attendance;
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';

const Attendance = () => {  
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle search query change
  const handleInputChange = (event) => {  
    setQuery(event.target.value);
  };

  // Function to handle search form submission
  const handleFormSubmit = async(req) => {
    // // Perform search logic here and update the results state
    // // You can use an API call, filter an array, or any other method to retrieve the search results
    try {
      dispatch(showLoading()); 
      // console.log(req.body.query) 
      console.log(query)
      const res = await axios.post(
        "/api/v1/doctor/getSearchedAttendee",
        {
          phone:query,
        },
      );
      dispatch(hideLoading());
      if (res.data.success) {   
        console.log(res.data.data)
         setResults(res.data.data);   
         console.log("data")
         console.log(results)
         message.success(res.data.message); 
      } else {
        message.error(res.data.success);
      } 
      
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    } 
    
  };  
  useEffect(() => {
    console.log('Results updated:', results);
  }, [results]);
  
  return (
    <Layout> 
      <form onSubmit={handleFormSubmit}>
      <input type="text" className='m-3 w-50 h-10' value={query} onChange={handleInputChange} placeholder='Input Attendee Mobile Number'/>
        <button type="submit" className="w-40 btn btn-primary">Search</button>
      </form>
      {/* Render the search results */}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Attendance;
