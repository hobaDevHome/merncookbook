// @ts-nocheck
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import { storage } from "../../firebase-config";

import Navbar from "./Navbar";

const getURL = "https://merncookbook-server.vercel.app/recipes";

const putURL = "https://merncookbook-server.vercel.app/recipe/";

const RecipeForm = () => {
  const [isEdit, setisEdit] = useState(false);
  const [currentRecipe, setcurrentRecipe] = useState({});
  const [title, settitle] = useState("");
  const [ingredient1, setingredient1] = useState("");
  const [ingredient2, setingredient2] = useState("");
  const [ingredient3, setingredient3] = useState("");
  const [ingredient4, setingredient4] = useState("");
  const [method, setmethod] = useState("");
  const [category, setcategory] = useState("all");
  const [servings, setservings] = useState(1);
  const [time, settime] = useState(15);
  const [hardness, sethardness] = useState(1);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isEditing = location.pathname.includes("edit");
    if (isEditing) {
      let pathList = location.pathname.split("/");
      let id = pathList[pathList.length - 1];

      setisEdit(isEditing);

      axios
        .get(putURL + id)
        .then((Response) => {
          setcurrentRecipe(Response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEdit, location.pathname]);

  useEffect(() => {
    if (currentRecipe) {
      if (currentRecipe.title) settitle(currentRecipe.title);
      if (currentRecipe.ingredient1) setingredient1(currentRecipe.ingredient1);
      if (currentRecipe.ingredient2) setingredient2(currentRecipe.ingredient2);
      if (currentRecipe.ingredient3) setingredient3(currentRecipe.ingredient3);
      if (currentRecipe.ingredient4) setingredient4(currentRecipe.ingredient4);
      if (currentRecipe.method) setmethod(currentRecipe.method);
      if (currentRecipe.category) setcategory(currentRecipe.category);
      if (currentRecipe.hardness) sethardness(currentRecipe.hardness);
      if (currentRecipe.servings) setservings(currentRecipe.servings);
      if (currentRecipe.time) settime(currentRecipe.time);
    }
  }, [isEdit, currentRecipe]);

  const onChooseImageFile = (e) => {
    let suffex = Date.now();

    let name = e.target.files[0] ? e.target.files[0].name : "";

    setImage(e.target.files[0]);

    if (e.target.files[0]) {
      setisLoading(true);
      const storageRef = ref(
        storage,
        `recipes/${suffex}_${e.target.files[0].name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Upload is in progress");
        },
        (error) => {
          console.log("upload error", error);
          setisLoading(false);
        },
        () => {
          console.log("success");

          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setImageURL(url);
              setisLoading(false);
            })
            .catch((error) => {
              // Handle any errors
              console.log("upload error", error);
              setisLoading(false);
            });
          setImageName(`${suffex}_${name}`);
        }
      );
    }
  };

  const submitRecipe = (event) => {
    event.preventDefault();

    if (
      title === "" ||
      ingredient1 === "" ||
      ingredient2 === "" ||
      method === ""
    ) {
      toast.error("Missing required fields");
    } else {
      setIsProcessing(true);
      if (isEdit) {
        let pathList = location.pathname.split("/");
        let id = pathList[pathList.length - 1];
        axios
          .put(`${putURL}${id}`, {
            title: title,
            ingredient1: ingredient1,
            ingredient2: ingredient2,
            ingredient3: ingredient3,
            ingredient4: ingredient4,
            category: category,
            hardness: hardness,
            servings: servings,
            time: time,
            imageName: imageName,
            imageURL: imageURL,
            method: method,
          })
          .then((response) => {
            console.log("recipe updated");
            setIsProcessing(false);
            navigate("/");
            toast.success("Recipe updated");
          })
          .catch((error) => {
            console.log(error);
            setIsProcessing(false);
            toast.error("Something went wrong");
          });
      } else {
        axios
          .post(getURL, {
            title: title,
            ingredient1: ingredient1,
            ingredient2: ingredient2,
            ingredient3: ingredient3,
            ingredient4: ingredient4,
            category: category,
            hardness: hardness,
            servings: servings,
            time: time,
            imageName: imageName,
            imageURL: imageURL,
            method: method,
          })
          .then((response) => {
            console.log("recipe created");
            setIsProcessing(false);
            navigate("/");
            toast.success("Recipe created");
          })
          .catch((error) => {
            setIsProcessing(false);
            console.log(error);
            toast.error("Something went wrong");
          });
      }
    }
  };

  const handleSelectCat = (e) => {
    setcategory(e.target.value);
  };

  const handleSelectHard = (e) => {
    sethardness(+e.target.value);
  };
  const handleSelectServing = (e) => {
    setservings(+e.target.value);
  };

  const handleSelectTime = (e) => {
    settime(+e.target.value);
  };

  return (
    <div className="continer max-w-screen-xl bg-gray-100 mx-auto">
      <Navbar />
      <div className="flex flex-col ">
        {isProcessing && (
          <div
            className="loader"
            style={{ position: "absolute", top: 30, left: "50%" }}
          ></div>
        )}
        <form onSubmit={submitRecipe} encType="multipart/form-data">
          <div className="flex items-center">
            <label className="label-form">
              Title:<span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              onChange={(e) => settitle(e.target.value)}
              placeholder="title"
              value={title}
              style={{ width: "100%" }}
              className="input-new-form"
            />
          </div>
          <div className="flex items-center">
            <label className="label-form">
              ingredient1:<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setingredient1(e.target.value)}
              placeholder="ingredient1"
              value={ingredient1}
              style={{ width: "100%" }}
              className="input-new-form"
            />
          </div>
          <div className="flex items-center">
            <label className="label-form">
              ingredient2:<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setingredient2(e.target.value)}
              placeholder="ingredient2"
              value={ingredient2}
              style={{ width: "100%" }}
              className="input-new-form"
            />
          </div>
          <div className="flex items-center">
            <label className="label-form">ingredient3:</label>
            <input
              type="text"
              onChange={(e) => setingredient3(e.target.value)}
              placeholder="ingredient3"
              value={ingredient3}
              style={{ width: "100%" }}
              className="input-new-form"
            />
          </div>
          <div className="flex items-center">
            <label className="label-form">ingredient4:</label>
            <input
              type="text"
              onChange={(e) => setingredient4(e.target.value)}
              placeholder="ingredient4"
              value={ingredient4}
              style={{ width: "100%" }}
              className="input-new-form"
            />
          </div>
          <div className="flex items-center mb-5">
            <label className="label-form">Recipe category:</label>

            <div className="select">
              <select name="servings" id="servings" onChange={handleSelectCat}>
                <option value="all">All</option>
                <option value="carb">Low Carb</option>
                <option value="fat">Low Fat</option>
                <option value="veg">Vegetarian</option>
              </select>
            </div>

            <label className="label-form">Recipe difficulty:</label>
            <div className="select">
              <select name="servings" id="servings" onChange={handleSelectHard}>
                <option value="1">Very Easy</option>
                <option value="2">Easy</option>
                <option value="3">Moderate</option>
                <option value="4">Hard</option>
                <option value="5">Quite Difficult</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mb-5">
            <label className="label-form">How many servings:</label>
            <div className="select">
              <select
                name="servings"
                id="servings"
                onChange={handleSelectServing}
              >
                <option value="1">1 serving</option>
                <option value="2">2 serving</option>
                <option value="3">3 serving</option>
                <option value="4">4 serving</option>
                <option value="5">5 serving</option>
                <option value="6">6 serving</option>
              </select>
            </div>

            <label className="label-form">Preparation time:</label>
            <div className="select">
              <select name="time" id="time" onChange={handleSelectTime}>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
          </div>

          <label className="label-form">
            Instructions:<span className="text-red-600">*</span>
          </label>
          <div className="flex items-center">
            <textarea
              onChange={(e) => setmethod(e.target.value)}
              placeholder="Instructions goes here"
              value={method}
              className="input-area"
              style={{ width: "100%" }}
              rows={6}
            />
          </div>
          <div className="flex items-center">
            <label className="label-form">
              Upload a photo for your recipe :{" "}
            </label>
            <div className="form-group">
              <input
                type="file"
                filename="image"
                className="form-control-file"
                onChange={onChooseImageFile}
              />
            </div>
          </div>
          {isLoading && <div className="loader"></div>}
          <div className="flex flex-row justify-center">
            <button
              disabled={isLoading}
              type="submit"
              name="action"
              className={`${
                isLoading || isProcessing ? "" : "button-new-form "
              }`}
            >
              {isEdit ? "Update Recipe" : "Add Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
