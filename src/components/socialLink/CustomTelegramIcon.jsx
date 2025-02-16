import React, { useState, useLayoutEffect } from "react";
import LightTelegramIcon from "../../assets/icons/telegramIconLight.svg";
import DarkTelegramIcon from "../../assets/icons/telegramIconDark.svg";

function CustomTelegramIcon() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useLayoutEffect(() => {
    const handleThemeChange = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const getTelegramIcon = () => {
    return theme === "light" ? DarkTelegramIcon : LightTelegramIcon;
  };

  return <img src={getTelegramIcon()} alt="Telegram Icon" />;
}

export default CustomTelegramIcon;
