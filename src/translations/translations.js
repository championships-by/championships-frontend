import i18n from "i18next";
import ru from "./locales/ru.json";
import by from "./locales/by.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru,
    },
    by: {
      translation: by,
    },
  },
  lng: localStorage.getItem("language") || "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
