import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      theme="dark"
      position="top-left"
      autoClose={2000}
      closeOnClick
      pauseOnHover={false}
    />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
