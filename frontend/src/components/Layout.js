import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { message, Badge } from 'antd';
import { useSelector } from 'react-redux';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  const volunteerMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Form',
      path: '/apply-attendee',
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Attendees',
      path: '/attendees',
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Sessions',
      path: '/sessions',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
  ];

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isVolunteer ? volunteerMenu : userMenu;

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className={`main ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Miracle-Box</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-items ${isActive && 'active'}`} key={menu.path}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-items" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: 'pointer' }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate('/notification');
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
    </>
  );
};

export default Layout;
