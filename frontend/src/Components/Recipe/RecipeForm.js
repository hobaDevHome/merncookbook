import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// @ts-ignore
import nnn from "../../images/new.jpg";

const url = "http://localhost:4000/recipes";

const RecipeForm = () => {
  const [title, settitle] = useState("");
  const [ingredient1, setingredient1] = useState("");
  const [ingredient2, setingredient2] = useState("");
  const [ingredient3, setingredient3] = useState("not provided");
  const [ingredient4, setingredient4] = useState("not provided");
  const [method, setmethod] = useState("");
  const [category, setcategory] = useState("");
  const [servings, setservings] = useState(0);
  const [time, settime] = useState(0);
  const [hardness, sethardness] = useState(0);
  const [favourite, setfavourite] = useState(false);

  const navigate = useNavigate();

  const submitRecipe = (event) => {
    event.preventDefault();

    axios
      .post(url, {
        title: title,
        ingredient1: ingredient1,
        ingredient2: ingredient2,
        ingredient3: ingredient3,
        ingredient4: ingredient4,
        method: method,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="continer max-w-screen-xl bg-gray-100 mx-auto">
      <div className="flex flex-col ">
        <div className="relative">
          <img
            src={nnn}
            alt=""
            style={{ width: "100%", height: 300, objectFit: "contain" }}
          />
        </div>

        <form onSubmit={submitRecipe}>
          <label className="label-form"> Title:</label>
          <input
            type="text"
            onChange={(e) => settitle(e.target.value)}
            placeholder="title"
            value={title}
            className="input-new-form"
          />
          <label className="label-form">ingredient1:</label>
          <input
            type="text"
            onChange={(e) => setingredient1(e.target.value)}
            placeholder="ingredient1"
            value={ingredient1}
            className="input-new-form"
          />

          <label className="label-form">ingredient2:</label>
          <input
            type="text"
            onChange={(e) => setingredient2(e.target.value)}
            placeholder="ingredient2"
            value={ingredient2}
            className="input-new-form"
          />
          <label className="label-form">ingredient3:</label>
          <input
            type="text"
            onChange={(e) => setingredient3(e.target.value)}
            placeholder="ingredient3"
            value={ingredient3}
            className="input-new-form"
          />
          <label className="label-form">ingredient4:</label>
          <input
            type="text"
            onChange={(e) => setingredient4(e.target.value)}
            placeholder="ingredient4"
            value={ingredient4}
            className="input-new-form"
          />
          <label className="label-form">method:</label>

          <textarea
            onChange={(e) => setmethod(e.target.value)}
            placeholder="method"
            value={method}
            className="input-new-form"
            rows={6}
          />

          <div className="flex flex-row justify-center">
            <button type="submit" name="action" className="button-new-form">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
