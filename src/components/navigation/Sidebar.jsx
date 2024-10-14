import React from "react";
import prof from "../assets/user6.png";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close"; 

const Sidebar = ({ open, onClose }) => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
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
        <img
          src={prof}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-white"
        />
        <h2 className="mt-2 text-lg font-bold">{auth?.username}</h2>
      </div>

      <nav className="flex-grow mt-4">
        <ul>
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span className="ml-3">المواعيد</span>
          </li>
          {auth.role === "driver" && (
            <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
              <span className="ml-3">شركات الصيانه</span>
            </li>
          )}
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span className="ml-3">الملف الشخصي</span>
          </li>
          <li className="flex items-center p-4 hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            <span className="ml-3" onClick={logout}>
              تسجيل الخروج
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
