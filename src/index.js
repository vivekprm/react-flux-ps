import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// Here we are using named reference. Named references are handy way to import
// functions inside element we are importing.
// Creates a constant called render that references react-dom's render function.
import { render } from "react-dom";
import App from "./components/App";

render(<App />, document.getElementById("root"));
