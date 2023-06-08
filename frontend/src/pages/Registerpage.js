import React from 'react';
import {Form , message} from 'antd';
import "../styles/RegisterStyle.css";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link, useNavigate} from "react-router-dom"; 
import axios from 'axios'

const Register = () => {
  //form handler 
  const navigate = useNavigate(); // to navigate to other pages when work of one finished
  const dispatch = useDispatch();

  const onFinishHandler = async(values)=>{
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register",values);
      dispatch(hideLoading());

      if(res.data.success){
        message.success("Register Successfully!")
        navigate("/login")
      } 
      else{
        message.error(res.data.message); 
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error); 
      message.error('Something went wrong')
    }
  };
  return (
    <>
      <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler}
       className="register-form">

      <h3 className='text-centre '>Register Form</h3>

        <Form.Item label="Name" name="name">
          <input type='text' required className='input-form'/>
        </Form.Item>

        <Form.Item label="Email" name="email">
          <input type='email' required className='input-form'/>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <input type='password' required className='input-form'/>
        </Form.Item>

         <Link to="/login" className="m-2">
         Already registered? Login here.
         </Link>
        <button className="btn btn-primary" type='submit'>Register</button>
      </Form>
      </div>
    </>
  )
}

export default Register