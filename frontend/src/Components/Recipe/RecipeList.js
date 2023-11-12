import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import favfill from "../../images/favFill.png";
import favempty from "../../images/favEmpty.png";

const url = "http://localhost:4000/recipe/";

const RecipeList = ({ recipes }) => {
  const location = useLocation();

  return (
    <div className=" mx-auto w-11/12 mt-5">
      {!location.pathname.includes("fav") && (
        <Link to={`/new`} style={{ textDecoration: "none" }}>
          <div className="bg-pink-600 text-white rounded-lg shadow-sm p-3 ml-2   text-center w-[170px] font-medium font-custom7  hover:bg-pink-500">
            Add New Recipe
          </div>
        </Link>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {recipes.length > 0 &&
          recipes.map((item, index) => (
            <div key={index} className="flex justify-center  ">
              <RecipeCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeList;

const RecipeCard = (item) => {
  const [isFaved, setisFaved] = useState(item.item.favourite);

  let hardness = 2;
  let hardFill = new Array(hardness).fill(0);
  let hardEmpty = new Array(5 - hardness).fill(0);
  // const location = useLocation();

  // console.log("location", location.pathname);

  const toggleFav = () => {
    console.log("recipe id : ", item.item._id);
    axios
      .put(`${url}${item.item._id}`, {
        favourite: !isFaved,
      })
      .then((response) => {
        console.log("fav is toggled");
        setisFaved(!isFaved);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-pink-200 w-[280px] m-3 p-4 rounded relative">
      <img
        src={isFaved ? favfill : favempty}
        alt="favourite"
        className="absolute top-6 right-6 w-8 cursor-pointer hover:scale-125 transition-all  duration-200 ease-out z-10"
        onClick={toggleFav}
      />
      <Link to={`/recipe/${item.item._id}`} style={{ textDecoration: "none" }}>
        <div className="relative">
          <img src="hummus.jpg" alt="" className="rounded " />
        </div>
        <p className="text-center text-lg font-custom font-bold mt-2 ">
          {item.item.title}
        </p>
        <div className="flex items-center mt-3">
          <div>
            <img src="person.png" alt="" className=" w-5" />
          </div>
          <div className="text-lg ml-2">3 Servings</div>
        </div>
        <div className="flex items-center mt-3">
          <div>
            <img src="clock.png" alt="" className=" w-5" />
          </div>
          <div className="text-lg ml-2">25 min.</div>
        </div>
        {item.item.hardness && (
          <div className="flex items-center mt-3 mb-5">
            {hardFill.map((e, index) => (
              <img
                src="hardFill.png"
                alt=""
                className=" w-5 mr-1"
                key={index}
              />
            ))}
            {hardEmpty.map((e, index) => (
              <img
                src="hardNoFill.png"
                alt=""
                className=" w-5 mr-1"
                key={index}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};
