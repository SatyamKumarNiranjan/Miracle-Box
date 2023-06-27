import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  //getUsers
  const getVolunteer = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setVolunteers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };  
  // delete corresponding id 
  const deleteAccountStatus = (record, status, id) => {
    // Update the status of the record
    record.status = status;
  
    // Delete corresponding data if status is "rejected"
    // if (status === "rejected") {
    //   // Delete the data with the specified id
    //   deleteData(id);
    // }
  
    // // Perform any other necessary operations based on the status
  
    // Update the state or trigger a re-render if needed
  };
  //handle account 

  const handleAccountStatus = async(record , status) =>{ 
    try {
      const res  = await axios.post('/api/v1/admin/changeAccountStatus' , {
        volunteerId:record._id , userId : record.userId , status : status},
        {
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        }) 
        if (res.data.success){
          message.success(res.data.message) ;  
          window.location.reload(); 
        }
    } catch (error) {
      message.error('Something Went Wrong')
    }

  }
  useEffect(() => {
    getVolunteer();
  }, []);
  const filteredVolunteers = volunteers.filter((volunteer) => volunteer.status !== "rejected");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <>
              <button className="m-2 btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>
                Approve
              </button>
              <button className="m-2 btn btn-danger" onClick={() => handleAccountStatus(record, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
  
  return (
    <Layout>
      <h1 className="text-center m-3">All Volunteers</h1>
      <Table columns={columns} dataSource={filteredVolunteers} />
    </Layout>
  );
}

export default Volunteers;