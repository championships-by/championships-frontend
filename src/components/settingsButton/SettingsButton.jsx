import React, { useState, useEffect, useRef } from "react";
import { FloatButton } from "antd";
import { SettingOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { LANGUAGES } from "@/const";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/store/languages";
import { changeLanguageAsync } from "@/store/languages";

import { useTranslation } from "react-i18next";

function SettingsButton() {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const floatButtonGroupRef = useRef(null);

  const onClick = () => {
    setOpen(!isOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = language === LANGUAGES.RU ? LANGUAGES.BY : LANGUAGES.RU;
    dispatch(changeLanguageAsync(newLanguage));
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    const handleClickOutside = (event) => {
      if (
        floatButtonGroupRef.current &&
        !floatButtonGroupRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "" : "dark-theme";
    localStorage.setItem("theme", theme);

    // Event for Social Button
    const event = new Event("themeChange");
    window.dispatchEvent(event);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div ref={floatButtonGroupRef}>
        <FloatButton.Group
          style={{ insetInlineEnd: 90 }}
          open={isOpen}
          trigger="click"
          onClick={onClick}
          icon={<SettingOutlined />}
        >
          <FloatButton
            icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
          />
          <FloatButton
            description={t("COMMON.LANGUAGE")}
            onClick={toggleLanguage}
          />
        </FloatButton.Group>
      </div>
    </>
  );
}

export default SettingsButton;
