import React, { useEffect, useState } from "react";
import loader from "@assets/img/loader.gif";
import loaderDark from "@assets/img/loaderDark.gif";

import "./sass/loader.scss";

function Loader({ show, ...props }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div className={`loader ${!show && "hide"}`} {...props}>
      <img
        src={theme === "light" ? loader : loaderDark}
        className="loader-gif"
      />
    </div>
  );
}

export default Loader;
