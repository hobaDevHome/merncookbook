import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let loc = useLocation();
  let acitve = "";

  if (loc.pathname.includes("new")) {
    acitve = "new";
  } else if (loc.pathname.includes("fav")) {
    acitve = "fav";
  } else if (loc.pathname.includes("recipe")) {
    acitve = "recipe";
  } else {
    acitve = "home";
  }

  return (
    <div>
      <div className="topnav">
        <Link
          to={`/`}
          className={`${acitve === "home" ? "activelink" : ""} topnavLink`}
        >
          Home
        </Link>
        <Link
          to={`/fav`}
          className={`${acitve === "fav" ? "activelink" : ""} topnavLink`}
        >
          Favourite Recipes
        </Link>
        <Link
          to={`/new`}
          className={`${acitve === "new" ? "activelink" : ""} topnavLink`}
        >
          Add New Recipe
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
