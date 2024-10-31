import React from "react";
import loader from "@assets/img/loader.gif";
import loaderDark from "@assets/img/loaderDark.gif";

import "./sass/loader.scss";

function Loader({ show, ...props }) {
  return (
    <div className={`loader ${!show && "hide"}`} {...props}>
      <div className="loader-gif" />
    </div>
  );
}

export default Loader;
