// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import favfill from "../../images/favFill.png";
import favempty from "../../images/favEmpty.png";
import del from "../../images/del2.png";

const url = "http://localhost:4000/recipe/";

const RecipeList = ({ recipes }) => {
  const [currentList, setcurrentList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (recipes) {
      setcurrentList(recipes);
    }
  }, [recipes]);

  const deleteRecipe = (id) => {
    axios
      .delete(`${url}${id}`)
      .then((Response) => {
        console.log(`Deleted recipe `);
        let temp = currentList.filter((e) => e._id !== id);
        setcurrentList(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {currentList &&
          currentList.length > 0 &&
          currentList.map((item, index) => (
            <div key={index} className="flex justify-center  ">
              <RecipeCard item={item} deleteRecipe={deleteRecipe} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeList;

const RecipeCard = ({ item, deleteRecipe }) => {
  const [isFaved, setisFaved] = useState(false);

  useEffect(() => {
    if (item) {
      setisFaved(item.favourite);
    }
  }, []);

  if (!item) {
    return null;
  }
  const toggleFav = () => {
    axios
      .put(`${url}${item._id}`, {
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

  console.log("isfaved", item.hardness);
  return (
    <div className="bg-pink-200 w-[280px] m-3 p-4 rounded relative">
      <img
        src={isFaved ? favfill : favempty}
        alt="favourite"
        className="absolute top-6 right-6 w-8 cursor-pointer hover:scale-125 transition-all  duration-200 ease-out z-10"
        onClick={toggleFav}
      />
      <Link to={`/recipe/${item._id}`} style={{ textDecoration: "none" }}>
        <div className="relative">
          <img src="hummus.jpg" alt="" className="rounded " />
        </div>
        <p className="text-center text-lg font-custom font-bold mt-2 ">
          {item.title}
        </p>
        <div className="flex items-center mt-3">
          <div>
            <img src="person.png" alt="" className=" w-5" />
          </div>
          <div className="text-lg ml-2">
            {item.servings ? item.servings : "-"} Serving
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div>
            <img src="clock.png" alt="" className=" w-5" />
          </div>
          <div className="text-lg ml-2">
            {" "}
            {item.time ? item.time : "-"} min.
          </div>
        </div>
        {item.hardness && (
          <div className="flex items-center mt-3 mb-5">
            {new Array(item.hardness).fill(0).map((e, index) => (
              <img
                src="hardFill.png"
                alt=""
                className=" w-5 mr-1"
                key={index}
              />
            ))}
            {new Array(5 - item.hardness).fill(0).map((e, index) => (
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
      <img
        onClick={() => deleteRecipe(item._id)}
        src={del}
        alt=""
        className="w-6 absolute bottom-5 right-5 cursor-pointer hover:scale-125 transition-all ease-in"
      />
    </div>
  );
};
