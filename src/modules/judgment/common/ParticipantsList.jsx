import React from "react";
import "@modules/judgment/common/sass/participants-list.scss";

function ParticipantsList({ participants }) {
  return (
    <ul className="participants-list">
      {participants.map((participant, index) => (
        <li key={index}>{participant}</li>
      ))}
    </ul>
  );
}

export default ParticipantsList;
