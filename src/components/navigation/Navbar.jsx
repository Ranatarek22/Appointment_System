import React, { useState } from "react";
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
              <MenuItem onClick={() => handleNavigate("/")}>الرئيسيه</MenuItem>
              {!auth.isAuthenticated
                ? [
                    <MenuItem
                      key="login"
                      onClick={() => handleNavigate("/login")}
                    >
                      تسجيل
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleNavigate("/register")}
                    >
                      تسجيل الدخول
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
                      الحساب
                    </MenuItem>,
                    <MenuItem key="logout" onClick={logout}>
                      تسجيل الخروج
                    </MenuItem>,
                  ]}
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/")}>
              الرئيسيه
            </Button>
            {!auth.isAuthenticated && (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  تسجيل الخول
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  تسجيل
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
                  الحساب
                </Button>
                <Button color="inherit" onClick={logout}>
                  تسجيل الخروج
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
