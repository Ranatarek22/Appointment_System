import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import Services from "./Services";
import Navbar from "../../navigation/Navbar";

// import useRefreshToken from "../hooks/useRefreshToken";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const refresh = useRefreshToken();
  const logout = async () => {
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-screen"
      >
        {/* <img
        src={assets.hero}
        alt="Hero Background"
        className="w-full h-full object-cover"
      /> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <Typography
              variant="h1"
              className="mb-4 text-4xl md:text-6xl font-bold"
            >
              أهلا بك في صيانه
            </Typography>
            <Typography variant="lead" className="mb-8 text-xl md:text-2xl">
              ابدا حجزك الان
            </Typography>
            {/* <div className="flex justify-center gap-4">
              <Button size="lg" color="white" className="hover:bg-blue-500">
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button size="lg" color="blue" className="hover:bg-blue-500">
                <Link to="/register" className="text-white">
                  تسجيل
                </Link>
              </Button>
            </div> */}
          </motion.div>
        </div>
      </motion.div>
      <Services />
    </div>
  );
};

export default Home;