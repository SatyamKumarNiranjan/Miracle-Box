import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Loginpage";
import Register from "./pages/Registerpage";
import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ProtectedRoutes from "./components/protectedRoutes";
import PublicRoutes from "./components/publicRoutes";
import Notificationpage from "./pages/Notificationpage";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import ApplyAttendee from "./pages/ApplyAttendee";
import ApplyVolunteer from "./pages/applyVolunteer";
import Volunteers from "./pages/admin/Volunteers";
import Attendees from "./pages/doctor/attendees";
import DashBoard from "./pages/admin/DashBoard";
import SessionForm from './pages/SessionForm.js'
function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? (

      <Spinner/>) : 
      (
      <Routes>
          <Route path="/" 
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/apply-attendee" 
          element={
            <ProtectedRoutes>
              <ApplyAttendee />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/admin/volunteers" 
          element={
            <ProtectedRoutes>
              <Volunteers />
            </ProtectedRoutes>
          } 
        />   
         <Route path="/admin/dashboard" 
          element={
            <ProtectedRoutes>
              <DashBoard />
            </ProtectedRoutes>
          } 
        />  
        <Route path="/attendees" 
          element={
            <ProtectedRoutes>
              <Attendees />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/admin/users" 
          element={
            <ProtectedRoutes> 
              <Users /> 
            </ProtectedRoutes>
          } 
        />
        <Route path="/notification" 
          element={
            <ProtectedRoutes>
              <Notificationpage />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/apply-volunteer" 
          element={
            <ProtectedRoutes>
              <ApplyVolunteer />
            </ProtectedRoutes>
          } 
        />
          <Route path="/login" 
          element={
            <PublicRoutes>
            <Login />
            </PublicRoutes>
          } w
        />
          <Route path="/register"
           element={
            <PublicRoutes>
             <Register />
            </PublicRoutes>
          }
        /> 
        <Route path="/doctor/profile/:id"
           element={
            <ProtectedRoutes>
             <Profile />
            </ProtectedRoutes>
          }
        /> 
         <Route path="/sessions"
           element={
            <ProtectedRoutes>
             <SessionForm />
            </ProtectedRoutes>
          }
        /> 
          <Route path="/admin/sessions"
           element={
            <ProtectedRoutes>
             <SessionForm />
            </ProtectedRoutes>
          }
        /> 
        <Route path="/doctor/book-appointment/:doctorId"
           element={
            <ProtectedRoutes>
             <BookingPage />
            </ProtectedRoutes>
          }
        />
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;