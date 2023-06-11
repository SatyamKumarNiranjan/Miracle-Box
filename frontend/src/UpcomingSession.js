import { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./SocialCard";

function UpcomingSessions() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("http://localhost:9002/sessions1?results=6");
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData);
      setUsers(userData);
    })();
  }, []);
  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.type}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }

  return (
    <div className="Ups">
      <h1>Upcoming Sessions</h1>
      <input className="search-box" onInput={filterCards} placeholder="Search By session type..."/>
      <div className="cards-container1">

      {users&&users.map((user, index) => (
       
        <SocialCard key={index} userData={user} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingSessions;
