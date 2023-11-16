// @ts-nocheck
import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
import Navbar from "./Navbar";
import cover2 from "../../images/cover2.jpg";
import home2 from "../../images/home2.png";
import damn from "../../images/damn.png";
import dam2 from "../../images/dam2.jpg";
import fam from "../../images/family.jpg";

const url = "http://localhost:4000/recipes";
// const url = process.env.REACT_APP_MONGO_URI;

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

  return (
    <div className="continer max-w-screen-xl mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <img
            src={damn}
            alt=""
            className="object-contain w-[300px] mt-2 rounded-xl"
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
