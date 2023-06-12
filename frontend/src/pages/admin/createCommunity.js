import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import Layout from '../../components/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Community from './Community';

const CommunityPage = () => {
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      const response = await axios.get('/api/v1/admin/getAllCommunity');
      if (response.data.success) {
        setCommunityData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Community Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    }, 
    {
      title: 'Session Conducted', 
      dataIndex: 'sessions',
      render: (sessions, record) => sessions.length,
    },
  ];

  return (
    <Layout>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Link to="/createcommunity"  style={{ position: 'absolute', bottom: 20, right: 50 }}>
          <Button type="primary">Create Community</Button>
        </Link>
        <Table dataSource={communityData} columns={columns} />
      </div>
    </Layout>
  );
};

export default CommunityPage;
