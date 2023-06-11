import React,{useEffect , useState} from 'react';
import axios from "axios";
import Layout from "../components/Layout"; 
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
import SlideshowBox from '../SlideshowBox';
import UpcomingSessions from '../UpcomingSession';
const Home = () => { 
  const [sessions , setSessions] = useState([]);  
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
      console.log(sessions)
    } catch (error) {
      console.log(error)
    }
  } 
  useEffect(() => { 
    getSessions();
  },[]); 
  
  return (
    <Layout>
         <div>
        <SlideshowBox/>   
        <UpcomingSessions/>
        </div>
    </Layout>
  )
}

export default Home