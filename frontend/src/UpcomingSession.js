import React, { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./SocialCard";
import axios from "axios";

function UpcomingSessions() {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("/api/v1/user/getAllSessions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setSessions(response.data.data);
          setFilteredSessions(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSessions();
  }, []);

  const filterSessions = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredSessions = sessions.filter((session) =>
      session.type.toLowerCase().includes(value)
    );
    setFilteredSessions(filteredSessions);
  };

  return (
    <div className="Ups">
      <h1>Upcoming Sessions</h1>
      <input
        className="search-box"
        onInput={filterSessions}
        placeholder="Search By session type..."
      />
      <div className="cards-container1">
        {filteredSessions.map((session) => (
          <SocialCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingSessions;
