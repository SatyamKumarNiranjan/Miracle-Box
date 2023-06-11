import React,{useEffect , useState} from 'react';
import axios from "axios";
import Layout from "../components/Layout"; 
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
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
        <h1 className='text-center'>Home Page</h1> 
    </Layout>
  )
}

export default Home