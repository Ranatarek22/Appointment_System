import React, { createContext, useState } from "react";
import i18n from "../../i18n";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    document.documentElement.setAttribute("lang", newLanguage);
    document.documentElement.setAttribute(
      "dir",
      newLanguage === "ar" ? "rtl" : "ltr"
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
