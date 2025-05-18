import React, { useState, useLayoutEffect } from "react";
import LightTelegramIcon from "@/assets/icons/telegramIconLight.svg";
import DarkTelegramIcon from "@/assets/icons/telegramIconDark.svg";

function CustomTelegramIcon() {
  const [theme, setTheme] = useState();

  useLayoutEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");

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

  return (
    <img
      src={theme === "light" ? DarkTelegramIcon : LightTelegramIcon}
      alt="Telegram Icon"
    />
  );
}

export default CustomTelegramIcon;
