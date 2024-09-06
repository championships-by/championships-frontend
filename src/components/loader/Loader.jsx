import React from "react";
import loader from "@assets/img/loader.gif";

import "./sass/loader.scss";

function Loader({ show, ...props }) {
  return (
    <div className={`loader ${!show && "hide"}`} {...props}>
      <img src={loader} className="loader-gif" />
    </div>
  );
}

export default Loader;
