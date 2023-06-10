import React from 'react'
import { DatePicker, message } from 'antd';
import Layout from '../../components/Layout';
import { Col, Form, Input, Row, Select, TimePicker} from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { Option } from 'antd/es/mentions';
import moment from 'moment';

const CreateSession = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
    const handleSubmit = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/admin/createSession",
            {
              ...values
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };
  return (
    <Layout>
      <Form layout="vertical" onFinish={handleSubmit} className="m-3">
      <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>   
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Category"
              name="type"
              required
              rules={[{ required: true }]}
            >
             <Select
                placeholder="Select a option"
                allowClear
              >
                <Option value="Health"></Option> 
                <Option value="Education"></Option>
                <Option value="Awareness"></Option>
              </Select>
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="City"
              name="city"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>  
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Date" name="date" required>
            <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Form>
    </Layout>
  )
}

export default CreateSession
