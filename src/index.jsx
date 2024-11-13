import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./translations/translations";
import "@src/sass/lightTheme/index.scss";
import "@src/sass/darkTheme/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
