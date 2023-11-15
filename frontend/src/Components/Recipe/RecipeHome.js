// @ts-nocheck
import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
import Navbar from "./Navbar";
import cover from "../../images/cover.jpg";
import home2 from "../../images/home2.png";

const url = "http://localhost:4000/recipes";

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
        <div className="relative">
          <img
            src={home2}
            alt=""
            style={{ width: "100%", height: 300 }}
            className="w-11/12 mx-auto object-contain  mt-2 rounded-xl"
          />
          <div
            style={{ backgroundColor: "rgba(82, 82, 91, 0.7)" }}
            className="absolute top-6 right-20 font-custom text-3xl  text-white p-5 rounded-lg opacity-90 "
          >
            <p style={{ fontSize: 30 }}>My Cook book</p>
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
