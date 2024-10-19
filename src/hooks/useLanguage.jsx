import { useContext } from "react";
import { LanguageContext } from "../components/context/LanguageProvider";


const useLanguage = () => {
  return useContext(LanguageContext);
};

export default useLanguage;
