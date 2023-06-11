import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios"; 
import { message } from 'antd';

const Community = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [community , setCommunity] = useState([]);  
    const getAllCommunity = async () => {
      try {
        const res = await axios.get("/api/v1/admin/getAllCommunity"); 
        if(res.data.success){ 
          setCommunity(res.data.data); 
        }
      } catch (error) {
        console.log(error)
      } 
      console.log(community); 
    } 
    useEffect(() => {
      getAllCommunity();
    },[]); 
    
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the form submission from reloading the page
      const form = event.target;
      const name = form.querySelector('#name').value;
      const description = form.querySelector('#description').value;
      const district = form.querySelector('#district').value;
      const state = form.querySelector('#validationDefault04').value;
  
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/admin/createCommunity",
          {
            name,
            description,
            district,
            state
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
        message.error("Something Went Wrong");
      }
    };
  
    return (
      <Layout>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Community name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter community name"
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Add Description"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="district" className="form-label">
              District
            </label>
            <input
              type="text"
              className="form-control"
              id="district"
              required
              placeholder="Enter District"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault04" className="form-label">
              State
            </label>
            <select className="form-select" id="validationDefault04" required>
              <option selected disabled value="">
                Choose...
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              {/* Add more Indian states as options */}
            </select>
          </div>
  
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
      </Layout>
    );
  };
  
  export default Community;
  