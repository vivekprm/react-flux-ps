import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Here we are using named reference. Named references are handy way to import
// functions inside element we are importing.
// Creates a constant called render that references react-dom's render function.
import { render } from "react-dom";
import App from "./components/App";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
