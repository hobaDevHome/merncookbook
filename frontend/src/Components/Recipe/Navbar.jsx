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
        <Link to={`/`} style={{ textDecoration: "none", padding: 0 }}>
          <a className={`${acitve === "home" ? "active" : ""}`} href="#home">
            Home
          </a>
        </Link>
        <Link to={`/fav`} style={{ textDecoration: "none", padding: 0 }}>
          <a href="#fav" className={`${acitve === "fav" ? "active" : ""}`}>
            Favourite Recipes
          </a>
        </Link>
        <Link to={`/new`} style={{ textDecoration: "none", padding: 0 }}>
          <a href="#new" className={`${acitve === "new" ? "active" : ""}`}>
            Add New Recipe
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
