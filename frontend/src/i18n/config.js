/* eslint-disable global-require */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: require("./locales/en/translations.json"),
    },
    spa: {
      translations: require("./locales/spa/translations.json"),
    },
  },
  ns: ["translations"],
  defaultNS: ["translations"],
});

i18n.languages = ["en", "spa"];
i18n.init();

export { i18n };

export default i18n;
