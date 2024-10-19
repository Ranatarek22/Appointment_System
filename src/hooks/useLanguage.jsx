import { useContext } from "react";
import { LanguageProvider } from "../components/context/LanguageProvider";


const useLanguage = () => {
  return useContext(LanguageProvider);
};

export default useLanguage;
