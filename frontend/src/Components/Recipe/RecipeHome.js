import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import RecipeForm from "./RecipeForm";
import axios from "axios";

const url = "http://localhost:4000/recipes";
const delURL = "http://localhost:4000/recipe/";

function RecipeHome() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({});
  useEffect(() => {
    axios
      .get(url)
      .then((Response) => {
        setRecipes(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const updateCurrentRecipe = (item) => {
    setCurrentRecipe(item);
  };

  const deleteCurrentRecipe = (id) => {
    // setCurrentPlayer(id);
    console.log("player id : ", id);
    axios
      .delete(`${delURL}${id}`)
      .then((Response) => {
        console.log(`Deleted with ID ${id}`);
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
            src="cover.png"
            alt=""
            className="w-11/12 mx-auto object-cover  mt-2"
          />
          <div className="absolute top-6 left-0 font-custom text-3xl w-full flex flex-row justify-center text-gray-600 ">
            <p style={{ fontSize: 40 }}>My Cook book</p>
          </div>
        </div>

        <div className="col s3">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default RecipeHome;
