import React, { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function LanguageToggle() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("ru");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLanguage = language === "ru" ? "by" : "ru";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <FloatButton
      style={{ insetInlineEnd: 164 }}
      description={language === "ru" ? "БЕЛ" : "РУС"}
      onClick={toggleLanguage}
    />
  );
}

export default LanguageToggle;
