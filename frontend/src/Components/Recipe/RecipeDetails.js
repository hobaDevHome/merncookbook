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
import hardfill from "../../images/hardFill.png";
import hardnofill from "../../images/hardNoFill.png";
import home1 from "../../images/home1.jpg";
import { getStorage, ref, deleteObject } from "firebase/storage";

const url = "http://localhost:4000/recipe/";

const cats = {
  carb: "Low Carb",
  fat: "Low Fat",
  all: "General ",
  veg: "Vegetarian",
};

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  const storage = getStorage();

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

    let imageName = recipe.imageName;

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

  console.log(recipe.hardness);
  return (
    <div className="continer max-w-screen-xl mx-auto">
      <Navbar />
      <div className="flex  ">
        {/* ingredients section */}
        <div className="flex flex-col mr-4 flex-1 ">
          <div className="mt-5">
            <div className="">
              <p
                className=" font-custom text-2xl rounded-lg p-2 mb-2"
                style={{ backgroundColor: "#ffcb3e", color: "#003853" }}
              >
                {recipe.title}
              </p>
              <div
                style={{ color: "#003853", fontSize: 18, fontWeight: "bold" }}
                className=" rounded-lg shadow-sm p-3  w-[120px] "
              >
                Ingrendients
              </div>
              <div
                style={{
                  backgroundColor: "#ffcb3e",
                  height: 4,
                  marginLeft: 10,
                  marginRight: 10,
                  width: "50%",
                }}
              ></div>
              <div className="" style={{ marginTop: 20 }}>
                {ings.map((e, index) => (
                  <div className="flex items-center mt-3 ml-3" key={index}>
                    <div className="text-lg ml-2">- {e}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* instructions */}
          <div className="mt-5">
            <div
              style={{ color: "#003853", fontSize: 18, fontWeight: "bold" }}
              className=" rounded-lg shadow-sm p-3  w-[120px] "
            >
              Instructions
            </div>
            <div
              style={{
                backgroundColor: "#ffcb3e",
                height: 4,
                marginLeft: 10,
                marginRight: 10,
                width: "50%",
              }}
            ></div>
            <div>
              <div className="p-5 " style={{ marginTop: 10, width: "100%" }}>
                <div className="text-lg ml-2">{recipe.method}</div>
              </div>
            </div>
          </div>
        </div>
        {/* picture section */}
        <div className="relative flex-1">
          <img
            src={recipe.imageURL ? recipe.imageURL : home1}
            alt=""
            className="rounded-lg mt-2 mx-auto "
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              backgroundColor: "#ffcb3e",
            }}
            className="w-10 h-10 absolute top-4 right-6 cursor-pointer rounded-lg justify-center flex items-center hover:scale-125 transition-all  duration-200 ease-out"
          >
            <img
              onClick={deleteCurrentPlayer}
              src={del}
              alt=""
              className="w-8 h-8"
            />
          </div>
          <div
            style={{
              backgroundColor: "#ffcb3e",
            }}
            className="w-10 h-10 absolute top-16 right-6 cursor-pointer rounded-lg justify-center flex items-center hover:scale-125 transition-all  duration-200 ease-out"
          >
            <Link to={`/edit/${id}`} style={{ textDecoration: "none" }}>
              <img src={edit} alt="" className="w-8 h-8" />
            </Link>
          </div>
          <div
            className="absolute left-0 top-16"
            style={{
              backgroundColor: "#ffcb3e",
              color: "#003853",
              fontSize: 18,
              padding: 5,
              width: 110,
            }}
          >
            {cats[recipe.category]}
          </div>
          <div className="absolute bottom-2 right-10 border shadow-lg bg-white flex p-4 rounded-3xl h-[60px] w-[280px] justify-center  ">
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
          {recipe.hardness && (
            <div className="absolute bottom-24 right-10 border shadow-lg bg-white flex p-4 rounded-3xl h-[60px] w-[280px] justify-center  ">
              <p style={{ marginRight: 5 }}>Difficulty:</p>
              <div className="flex items-center mt-3 mb-5">
                {new Array(recipe.hardness).fill(0).map((e, index) => (
                  <img
                    src={hardfill}
                    alt=""
                    className=" w-5 mr-1"
                    key={index}
                  />
                ))}
                {new Array(5 - recipe.hardness).fill(0).map((e, index) => (
                  <img
                    src={hardnofill}
                    alt=""
                    className=" w-5 mr-1"
                    key={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
