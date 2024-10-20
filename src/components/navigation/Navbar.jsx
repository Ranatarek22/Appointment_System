import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import logo from "../assets/rentty_logo.png";
import Cookies from "js-cookie";
import { LanguageContext } from "../context/LanguageProvider";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const theme = useTheme();
  const { auth, setAuth } = useAuth();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const logout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAuth({});
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      className="bg-white"
      style={{ color: "black", backgroundColor: "white" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="ًصيانه" srcset={logo} />
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigate("/")}>
                {t("home")}
              </MenuItem>
              {!auth.isAuthenticated
                ? [
                    <MenuItem
                      key="login"
                      onClick={() => handleNavigate("/register")}
                    >
                      {t("register")}
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleNavigate("/login")}
                    >
                      {t("login_title")}
                    </MenuItem>,

                    <MenuItem onClick={toggleLanguage}>
                      {language === "en" ? "Arabic" : " الإنجليزية"}
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="profile"
                      onClick={() =>
                        handleNavigate(
                          auth.role === "driver" ? "/driver" : "/maintainer"
                        )
                      }
                    >
                      {t("profile")}
                    </MenuItem>,
                    <MenuItem key="logout" onClick={logout}>
                      {t("log_out")}
                    </MenuItem>,
                    <MenuItem onClick={toggleLanguage}>
                      {language === "en" ? "Arabic" : " الإنجليزية"}
                    </MenuItem>,
                  ]}
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/")}>
              {t("home")}
            </Button>

            {!auth.isAuthenticated && (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  {t("login_title")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  {t("register")}
                </Button>
              </>
            )}
            {auth.isAuthenticated && (
              <>
                <Button
                  color="inherit"
                  onClick={() =>
                    handleNavigate(
                      auth.role === "driver" ? "/driver" : "/maintainer"
                    )
                  }
                >
                  {t("profile")}
                </Button>
                <Button color="inherit" onClick={logout}>
                  {t("log_out")}
                </Button>
              </>
            )}
            <div className="mx-3">
              <Button onClick={toggleLanguage} className="bg-red">
                {language === "en" ? " Arabic" : "الإنجليزية"}
              </Button>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
