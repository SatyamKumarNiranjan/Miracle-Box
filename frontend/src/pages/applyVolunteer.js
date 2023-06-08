import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
const ApplyVolunteer = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-volunteer",
        {
          ...values,
          userId: user._id,
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
      message.error("Something Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Be A Volunteer</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Gender"
              name="gender"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your gender" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}> 
              <Input type="text" placeholder="your Aadhar Numbar" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Age" name="age" required
              rules={[{ required: true }]}>
              <Input type="text" placeholder="your Age" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>  
        </Row> 
        <h4>Other Details :</h4>
        <Row gutter={20}>
        <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Qualification"
              name="qualification"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your qualification" />
            </Form.Item>
          </Col>  
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Past Experience"
              name="pastExperience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your Past Experience" />
            </Form.Item>
          </Col>  
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Occupation"
              name="occupation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your occupation" />
            </Form.Item>
          </Col> 
        </Row>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
      </Form>
    </Layout>
  );
};

export default ApplyVolunteer;