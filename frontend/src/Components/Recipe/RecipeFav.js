import React, { useState, useEffect } from "react";

import RecipeList from "./RecipeList";

// @ts-ignore
import fav from "../../images/fav.jpg";
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
          console.log(Response.data);
          let temp = Response.data.filter((e) => e.favourite);
          setRecipes(temp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="continer max-w-screen-xl bg-gray-100 mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        <div className="relative">
          <img
            src={fav}
            alt=""
            style={{ width: "100%", height: 300, objectFit: "contain" }}
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
