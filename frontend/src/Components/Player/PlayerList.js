import React from "react";

const PlayerList = ({ players, updateCurrentPlayer, deleteCurrentPlayer }) => {
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>Players</h4>
        </li>
        {players.map((item) => (
          <div style={{ display: "flex" }}>
            <a
              href="#!"
              className="collection-item"
              key={item._id}
              onClick={() => updateCurrentPlayer(item)}
            >
              {item.firstName} {item.lastName}
            </a>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => deleteCurrentPlayer(item._id)}
            >
              delete
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
