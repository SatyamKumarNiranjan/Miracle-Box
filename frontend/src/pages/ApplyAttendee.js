import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import { Option } from "antd/es/mentions";
const ApplyAttendee = () => {
  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  // On Gender Change 
  
  //handle form 
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-attendee",
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
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Attendee Form</h1>
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
              <Input type="text" placeholder="your contact no" maxLength={10} />
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
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Father Name"
              name="fatherName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your father name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Mother Name"
              name="motherName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your Mother name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Aadhar Number" name="aadhar">
              <Input type="text" placeholder="your Aadhar Numbar" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Age"
              name="age"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your Age" />
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Community"
              name="community"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Community" />
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
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Marital Status"
              name="maritalStatus"
              required
              rules={[{ required: true }]}
            >
             <Select
                placeholder="Select a option"
                allowClear
              >
                <Option value="Married">Married</Option>
                <Option value="Unmarried">Unmarried</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Annual Income"
              name="income"
              required
              rules={[{ required: true }]}
            >
             <Select
                placeholder="Select a option"
                allowClear
              >
                <Option value="Less than 50,000">Less than 50,000</Option>
                <Option value="More than 50,000">More than 50,000</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Number of Children" name="children">
              <Input type="text" placeholder="your number of children" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Educational Details :</h4>
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
            <Form.Item label="Child Education" name="childEducation">
              <Input type="text" placeholder="your child Education" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Medical Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Past Major Injury"
              name="pastMajorInjury"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="write NA if not any" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Existing Illness"
              name="existingIllness"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="write NA if not any" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Allergies"
              name="allergies"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="write NA if not any" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Blood Group"
              name="bloodgroup"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="write NA if u havent checked" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyAttendee;
