import React, { useContext } from "react";
import prof from "../assets/user6.jpg";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { LanguageContext } from "../context/LanguageProvider";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";

const Sidebar = ({ open, onClose }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const logout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAuth({});
    navigate("/");
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen bg-gradient-to-b from-[#2A3D6D] to-[#1B2A55] text-white flex flex-col z-10 transition-transform transform lg:w-[20%] md:w-[30%] lg:translate-x-0 md:translate-x-0 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} className="lg:hidden absolute top-4 right-4">
        <CloseIcon style={{ fontSize: "2rem", color: "white" }} />
      </button>

      <div className="flex flex-col items-center p-4">
        <Avatar src={`https://avatars.dicebear.com/api/personas/`} alt="lol" />
        <h2 className="mt-2 text-lg font-bold">{auth?.username}</h2>
      </div>

      <nav className="flex-grow mt-4">
        <ul>
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span
              className="ml-3"
              onClick={() => {
                navigate("/");
              }}
            >
              {t("home")}
            </span>
          </li>
          {auth.role === "driver" && (
            <div>
              <li
                className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                onClick={() => {
                  navigate("/drivappoint");
                }}
              >
                <span className="ml-3">{t("appointment")}</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                onClick={() => {
                  navigate("/driver");
                }}
              >
                <span className="ml-3">{t("company")}</span>
              </li>
            </div>
          )}
          {auth.role === "maintainer" && (
            <div>
              <li
                className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                onClick={() => {
                  navigate("/maintappoint");
                }}
              >
                <span className="ml-3">{t("appointment")}</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                onClick={() => {
                  navigate("/maintainer");
                }}
              >
                <span className="ml-3">{t("schedule")}</span>
              </li>
            </div>
          )}
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span className="ml-3">{t("profile")}</span>
          </li>
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span className="ml-3" onClick={toggleLanguage}>
              {language === "en" ? "Arabic" : "الإنجليزية"}
            </span>
          </li>
        </ul>
      </nav>
      <div className="p-4 ">
        <li className="flex items-center p-4 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer">
          <span className="ml-3" onClick={logout}>
            {t("log_out")}
          </span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
