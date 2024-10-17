import React, { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "" : "dark-theme";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <FloatButton
      style={{ insetInlineEnd: 94 }}
      icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
      onClick={toggleTheme}
    />
  );
}

export default ThemeToggle;
