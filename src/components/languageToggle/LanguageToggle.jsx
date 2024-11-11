import React from "react";
import { FloatButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "@store/languages";
import { changeLanguageAsync } from "@store/languages";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@constants";

function LanguageToggle() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);

  const toggleLanguage = () => {
    const newLanguage = language === LANGUAGES.RU ? LANGUAGES.BY : LANGUAGES.RU;
    dispatch(changeLanguageAsync(newLanguage));
  };

  return (
    <FloatButton
      style={{ insetInlineEnd: 164 }}
      description={t("COMMON.LANGUAGE")}
      onClick={toggleLanguage}
    />
  );
}

export default LanguageToggle;
