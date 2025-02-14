import React, { useState, useEffect, useRef } from "react";
import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import CustomTelegramIconDark from "./CustomTelegramIconDark";
import CustomTelegramIconLight from "./CustomTelegramIconLight";

function SocialLinkButton() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setOpen] = useState(false);
  const floatButtonGroupRef = useRef(null);

  const onClick = () => {
    setOpen(!isOpen);
  };

  const openTelegram = () => {
    window.open("https://t.me/championshipsby", "_blank");
  };

  useEffect(() => {
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
