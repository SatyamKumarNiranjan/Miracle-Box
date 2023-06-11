import React , {useEffect , useState} from 'react' 
import Layout from '../../components/Layout' 
import axios from 'axios'
import { Table } from 'antd';  
import { useNavigate } from 'react-router-dom';

const Attendees = () => { 
  const Navigate = useNavigate()
  const [users , setUsers] = useState([]);   
 
  const renderUsers = () => {
    return users.map(user => (
      <tr key={user._id}>
        <td>{user.firstName}</td>
        <td>{user.phone}</td> 
        <td>{user.address}</td> 
        <div className="d-flex">
           <button className="btn btn-primary" onClick = {()=> Navigate(`/attendeeProfile/${user._id}`)}>Profile</button>
         </div>
      </tr>
    ));
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
  
  // users = users.data ; 
    return (
      <Layout>
        <h1 className='m-2 text-center'>Attendee List</h1>
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
      </Layout> 
    )
}

export default Attendees ; 
