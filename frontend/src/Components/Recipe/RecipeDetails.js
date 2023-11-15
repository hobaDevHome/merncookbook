// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import clock from "../../images/clock.png";
import person from "../../images/person.png";
import dot from "../../images/dot.png";
import del from "../../images/del2.png";
import edit from "../../images/edit2.png";
import Navbar from "./Navbar";
import placeHolder from "../../images/recipePlaceHodler.jpg";
import home1 from "../../images/home1.jpg";

const url = "http://localhost:4000/recipe/";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url + id)
      .then((Response) => {
        setRecipe(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let ings = [];

  if (!recipe) {
    return <h1>nothing found</h1>;
  }

  if (recipe.ingredient1) ings.push(recipe.ingredient1);
  if (recipe.ingredient2) ings.push(recipe.ingredient2);
  if (recipe.ingredient3) ings.push(recipe.ingredient3);
  if (recipe.ingredient4) ings.push(recipe.ingredient4);

  let ingsHeight = ings.length * 50 + 30;

  const deleteCurrentPlayer = () => {
    // setCurrentPlayer(id);

    axios
      .delete(`${url}${id}`)
      .then((Response) => {
        console.log(`Deleted recipe with ID ${id}`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="continer max-w-screen-xl mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        {/* picture section */}
        <div className="relative">
          <img
            src={recipe.image ? recipe.image : home1}
            alt=""
            className="rounded-lg mt-2 mx-auto"
            style={{ height: 300, objectFit: "cover" }}
          />
          <img
            onClick={deleteCurrentPlayer}
            src={del}
            alt=""
            className="w-8 absolute top-5 right-5 cursor-pointer"
          />
          <Link to={`/edit/${id}`} style={{ textDecoration: "none" }}>
            <img
              src={edit}
              alt=""
              className="w-8 absolute top-5 right-16 cursor-pointer"
            />
          </Link>
          <p className="absolute bottom-2 left-1 font-custom text-3xl ml-3">
            {recipe.title}
          </p>
          <div className="absolute bottom-[-40px] right-10 border shadow-lg bg-white flex p-4 rounded-3xl h-[60px] w-[280px] justify-center ">
            <div className="flex items-center mt-3 mb-2">
              <div>
                <img src={person} alt="" className=" w-5" />
              </div>
              <div className="text-lg ml-2">
                {recipe.servings ? recipe.servings : "-"} Serving
              </div>
            </div>
            <div className="w-[2px] h-[30px] bg-gray-300 ml-2 mr-2 mb-2"></div>
            <div className="flex items-center mt-3 justify-center mb-2">
              <div>
                <img src={clock} alt="" className=" w-5" />
              </div>
              <div className="text-lg ml-2">
                {recipe.time ? recipe.time : "-"} min.
              </div>
            </div>
          </div>
        </div>
        {/* ingredients section */}
        <div className="mt-5">
          <div
            className="bg-gray-200 w-[400px] mt-10 relative"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              height: ingsHeight,
            }}
          >
            <div
              style={{ backgroundColor: "#4b033c" }}
              className=" text-white rounded-lg shadow-sm p-3  w-[140px] font-medium font-custom absolute top-[-20px] left-7"
            >
              Ingrendients
            </div>
            <div
              className="absolute top-[20px] left-7"
              style={{ marginTop: 20 }}
            >
              {ings.map((e, index) => (
                <div className="flex items-center mt-3 ml-3" key={index}>
                  <div>
                    <img src={dot} alt="" className=" w-3" />
                  </div>
                  <div className="text-lg ml-2">{e}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* instructions */}
        <div className="mt-5">
          <div
            className="bg-gray-200 w-[700px] mt-10 relative mb-5"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              minHeight: 80,
              height: "auto",
            }}
          >
            <div
              style={{ backgroundColor: "#4b033c" }}
              className="bg-pink-600 text-white rounded-lg shadow-sm p-3  w-[140px] font-medium font-custom absolute top-[-20px] left-7"
            >
              Instructions
            </div>
            <div className="p-5 pt-10" style={{ marginTop: 20 }}>
              <div className="text-lg ml-2">{recipe.method}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
