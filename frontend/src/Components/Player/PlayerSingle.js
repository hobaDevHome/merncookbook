import React from "react";

const PlayerSingle = ({ player }) => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-image">
            <img src="soccer.jpeg" alt="Soccer image" />
            <span className="card-title">
              {player.firstName} {player.lastName}
            </span>
          </div>
          <div className="card-content">
            <p>
              Phone: {player.phone} - Email: {player.email}
            </p>
            <p>
              Strength: {player.strength} - Endurance: {player.endurance}
            </p>
          </div>
          <div className="card-action">Team: {player.team}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSingle;
