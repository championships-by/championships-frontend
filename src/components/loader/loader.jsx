import React from "react";
import "./sass/loader.scss";

const Loader = ({ show, ...props }) => {
  return (
    <>
      <div className={`loader ${!show && "hide"}`} {...props}>
        <div className="loadingio-spinner-dual-ring-3e86vgusq7a">
          <div className="ldio-92g1bd69czv">
            <div></div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
