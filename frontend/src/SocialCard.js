import React from "react";
import "./SocialCard.css";

const SocialCard = ({ session }) => {
  if (!session) {
    return null; // Return null or display a placeholder when session prop is undefined
  }

  return (
    <div className="card">
      <div className="card__title">{session.name}</div>
      <div className="card__body">
        <p>
          <strong>Type: </strong> {session.type}
        </p>
        <p>
          <strong>Locality: </strong> {session.address}
        </p>
        <p>
          <strong>City: </strong> {session.city}
        </p>
        <p>
          <strong>Date: </strong> {new Date(session.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SocialCard;
