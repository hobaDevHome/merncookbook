import React, { useState, useEffect } from "react";
import "./App.css";
import PlayerList from "./Player/PlayerList";
import PlayerSingle from "./Player/PlayerSingle";
import PlayerForm from "./Player/PlayerForm";
import axios from "axios";

const url = "http://localhost:4000/players";
const delURL = "http://localhost:4000/player/";

function PlayersHome() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((Response) => {
        setPlayers(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateCurrentPlayer = (item) => {
    setCurrentPlayer(item);
  };
  const deleteCurrentPlayer = (id) => {
    // setCurrentPlayer(id);
    console.log("player id : ", id);
    axios
      .delete(`${delURL}${id}`)
      .then((Response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("players", players);
  return (
    <div className="container-fluid">
      <h1 className="text-xl font-bold ">Hello world!</h1>
      <div className="row">
        <nav>
          <div className="nav-wrapper blue darken-1">
            <a href="/" className="brand-logo">
              Soccer Management
            </a>
          </div>
        </nav>
      </div>
      <div className="row">
        <div className="col s3">
          <PlayerList
            players={players}
            updateCurrentPlayer={updateCurrentPlayer}
            deleteCurrentPlayer={deleteCurrentPlayer}
          />
        </div>
        <div className="col s9">
          <PlayerSingle player={currentPlayer} />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <PlayerForm />
        </div>
      </div>
    </div>
  );
}

export default PlayersHome;
