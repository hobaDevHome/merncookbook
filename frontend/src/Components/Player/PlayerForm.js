import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "http://localhost:4000/players";

const PlayerForm = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const submitPlayer = (event) => {
    event.preventDefault();

    axios
      .post(url, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="row">
      <h1 className="center">Add a new player</h1>
      <form onSubmit={submitPlayer}>
        <label>
          First name:
          <input
            type="text"
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="first name"
            value={firstName}
          />
        </label>
        <label>
          Lasr name:
          <input
            type="text"
            onChange={(e) => setlastName(e.target.value)}
            placeholder="last name"
            value={lastName}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
            value={email}
          />
        </label>

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Add player
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
