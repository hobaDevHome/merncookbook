import React, { useState, useEffect } from "react";

import RecipeList from "./RecipeList";

// @ts-ignore
import fav from "../../images/fav.jpg";
import damn from "../../images/damn.png";
import axios from "axios";
import Navbar from "./Navbar";

const url = "http://localhost:4000/recipes";

function RecipeFav() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((Response) => {
        if (Response.data) {
          let temp = Response.data.filter((e) => e.favourite);
          setRecipes(temp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="continer max-w-screen-xl mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <img
            src={damn}
            alt=""
            className="object-contain w-2/12 mt-2 rounded-xl"
          />
          <img
            src={fav}
            alt=""
            className="object-contain  w-4/12 mt-2 rounded-xl"
          />
        </div>
        <div className="col s3">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default RecipeFav;
