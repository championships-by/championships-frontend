import React from "react";

import "./sass/loader.scss";

function Loader({ show, ...props }) {
  return (
    <div className={`loader ${!show && "hide"}`} {...props}>
      <div className="loader-gif" />
    </div>
  );
}

export default Loader;
