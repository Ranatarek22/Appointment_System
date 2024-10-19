import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json"; // English translations
import translationAR from "./locales/ar/translation.json"; // Arabic translations

// Define language resources
const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;
