// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import favfill from "../../images/favFill.png";
import favempty from "../../images/favEmpty.png";
import del from "../../images/del2.png";
import placeHolder from "../../images/recipePlaceHodler.jpg";
import { getStorage, ref, deleteObject } from "firebase/storage";

const url = "http://localhost:4000/recipe/";
const favurl = "http://localhost:4000/fav/";

const RecipeList = ({ recipes }) => {
  const [currentList, setcurrentList] = useState([]);
  const [currentCat, setCurrentCat] = useState("all");
  const location = useLocation();
  const storage = getStorage();

  useEffect(() => {
    if (recipes) {
      setcurrentList(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (recipes) {
      if (currentCat !== "all") {
        let temp = recipes.filter((e) => e.category === currentCat);
        setcurrentList(temp);
      } else {
        setcurrentList(recipes);
      }
    }
  }, [currentCat]);

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
    let currentRecipe = recipes.filter((e) => e._id === id);
    let imageName = currentRecipe[0].imageName;

    const desertRef = ref(storage, `recipes/${imageName}`);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("Recipe image deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Recipe image failed to delete");
      });
  };

  const handleSelectCat = (e) => {
    setCurrentCat(e.target.value);
  };

  return (
    <div className=" mx-auto w-11/12 mt-5">
      {!location.pathname.includes("fav") && (
        <div className="flex justify-between">
          <div className="flex items-center mb-5">
            <label className="label-form">Food category</label>
            <div className="select">
              <select name="servings" id="servings" onChange={handleSelectCat}>
                <option value="all">All</option>
                <option value="carb">Low Carb</option>
                <option value="fat">Low Fat</option>
                <option value="veg">Vegetarian</option>
              </select>
            </div>
          </div>
        </div>
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

  const location = useLocation();

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
      .put(`${favurl}${item._id}`, {
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
    <div className="bg-gray-200 w-[280px] m-3 p-4 rounded relative">
      {!location.pathname.includes("fav") && (
        <img
          src={isFaved ? favfill : favempty}
          alt="favourite"
          className="absolute top-6 right-6 w-8 cursor-pointer hover:scale-125 transition-all  duration-200 ease-out z-10"
          onClick={toggleFav}
        />
      )}
      <Link to={`/recipe/${item._id}`} style={{ textDecoration: "none" }}>
        <div className="relative">
          <img
            src={item.imageURL ? item.imageURL : placeHolder}
            alt=""
            className="rounded "
            style={{ width: "100%", height: 200, objectFit: "cover" }}
          />
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
