import React from "react";
import "./App.css";
import RecipeHome from "./Recipe/RecipeHome";
import RecipeDetails from "./Recipe/RecipeDetails";
import RecipeForm from "./Recipe/RecipeForm";
import RecipeFav from "./Recipe/RecipeFav";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route index element={<RecipeHome />} />
        <Route path="/new" element={<RecipeForm />} />
        <Route path="/fav" element={<RecipeFav />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<RecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;
