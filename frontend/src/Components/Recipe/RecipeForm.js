import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

// @ts-ignore
import nnn from "../../images/new.jpg";
import Navbar from "./Navbar";

const putURL = "http://localhost:4000/recipes";

const getURL = "http://localhost:4000/recipe/";

const RecipeForm = () => {
  const [isEdit, setisEdit] = useState(false);
  const [currentRecipe, setcurrentRecipe] = useState({});
  const [title, settitle] = useState("");
  const [ingredient1, setingredient1] = useState("");
  const [ingredient2, setingredient2] = useState("");
  const [ingredient3, setingredient3] = useState("");
  const [ingredient4, setingredient4] = useState("");
  const [method, setmethod] = useState("");
  const [category, setcategory] = useState("");
  const [servings, setservings] = useState(0);
  const [time, settime] = useState(0);
  const [hardness, sethardness] = useState(0);
  const [favourite, setfavourite] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isEditing = location.pathname.includes("edit");
    if (isEditing) {
      let pathList = location.pathname.split("/");
      let id = pathList[pathList.length - 1];

      setisEdit(isEditing);

      axios
        .get(getURL + id)
        .then((Response) => {
          setcurrentRecipe(Response.data);
          console.log(Response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEdit, location.pathname]);

  useEffect(() => {
    if (currentRecipe) {
      if (currentRecipe.title) settitle(currentRecipe.title);
      if (currentRecipe.ingredient1) settitle(currentRecipe.ingredient1);
      if (currentRecipe.ingredient2) settitle(currentRecipe.ingredient2);
      if (currentRecipe.ingredient3) settitle(currentRecipe.ingredient3);
      if (currentRecipe.ingredient4) settitle(currentRecipe.ingredient4);
      if (currentRecipe.method) settitle(currentRecipe.method);
    }
  }, [isEdit, currentRecipe]);

  const submitRecipe = (event) => {
    event.preventDefault();

    axios
      .post(putURL, {
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
      <Navbar />
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
          <label className="label-form">Instructions:</label>

          <textarea
            onChange={(e) => setmethod(e.target.value)}
            placeholder="Instructions goes here"
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
