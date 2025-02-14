import React, { useState, useEffect, useRef } from "react";
import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import CustomTelegramIconDark from "./CustomTelegramIconDark";
import CustomTelegramIconLight from "./CustomTelegramIconLight";

function SocialLinkButton() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const floatButtonGroupRef = useRef(null);

  const openTelegram = () => {
    window.open("https://t.me/championshipsby", "_blank");
  };

  useEffect(() => {
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

  const TelegramIconDark = () => (
    <CustomTelegramIconDark style={{ fontSize: "24px" }} />
  );

  const TelegramIconLight = () => (
    <CustomTelegramIconLight style={{ fontSize: "24px" }} />
  );

  return (
    <>
      <div ref={floatButtonGroupRef}>
        <FloatButton
          style={{ insetInlineEnd: 170 }}
          icon={
            theme === "light" ? <TelegramIconLight /> : <TelegramIconDark />
          }
          onClick={openTelegram}
        />
      </div>
    </>
  );
}

export default SocialLinkButton;
