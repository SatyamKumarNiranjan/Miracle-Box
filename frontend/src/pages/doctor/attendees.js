import React , {useEffect , useState} from 'react' 
import Layout from '../../components/Layout' 
import axios from 'axios'
import { Row, Table } from 'antd';
import './attendees.css'
import { useNavigate } from 'react-router-dom';
import DoctorList from '../../components/DoctorList';
const Attendees = () => { 

  const [users , setUsers] = useState([]); 
  const navigate =  useNavigate(); 
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

  // antd table col  
  
  // users = JSON.parse(users);
  return (
    <Layout>
        <h1 className='text-center'>Attendees</h1> 
        <Row className='ats'>
          {users && users.map(doctor =>(
            <DoctorList doctor = {doctor}/>
          ))}
        </Row>
    </Layout>
  )
}

export default Attendees ; 
