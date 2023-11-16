// @ts-nocheck
import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
import Navbar from "./Navbar";

import damn from "../../images/damn.png";

import fam from "../../images/family.jpg";

// const url = "http://localhost:4000/recipes";
const url = "https://merncookbook-front.vercel.app/recipes";

function RecipeHome() {
  const [recipes, setRecipes] = useState([]);

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

  console.log("recipes", recipes);
  return (
    <div className="continer max-w-screen-xl mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <img
            src={damn}
            alt=""
            className="object-contain w-3/12 mt-2 rounded-xl"
          />
          <img
            src={fam}
            alt=""
            className="object-contain  w-5/12 mt-2 rounded-xl"
          />
        </div>
        <div className="col s3">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default RecipeHome;
