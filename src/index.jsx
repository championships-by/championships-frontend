import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./translations/translations";
import "@sass/lightTheme/index.scss";
import "@sass/darkTheme/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
