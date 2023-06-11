import React from 'react';
import { Form, message } from 'antd';
import "./src/styles/RegisterStyle.css";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
  //form handler
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      //by below function brwser reload we are using this bcz the data requires to be reloaded to be updated
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  }
  return (
    <>
        <div className="form-container">
          <Form layout="vertical" onFinish={onFinishHandler}
            className="register-form">

            <h3 className='text-centre '>Login Form</h3>

            <Form.Item label="Email" name="email">
              <input type='email' required className='input-form' />
            </Form.Item>

            <Form.Item label="Password" name="password" >
              <input type='password' required className='input-form' />
            </Form.Item>

            <Link to="/register" className="m-2">
              Not a user? Register here.
            </Link>
            <button className="btn btn-primary" type='submit'>Login</button>
          </Form>
      </div>
    </>
  )
}

export default Login