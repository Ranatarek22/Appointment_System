import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { apiInstance } from "../../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAccessToken = Cookies.get("accessToken");
    const savedRefreshToken = Cookies.get("refreshToken");

    return {
      accessToken: savedAccessToken || "",
      refreshToken: savedRefreshToken || "",
      role: "",
      isAuthenticated: !!savedAccessToken,
      username: "",
      company: "",
    };
  });

  const fetchUserData = async (token) => {
    try {
      const response = await apiInstance.get("/users/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        role: response.data.role,
        isAuthenticated: true,
        username: response.data.username,
        company: response.data.company,
      };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.accessToken) {
        const userData = await fetchUserData(auth.accessToken);
        if (userData) {
          setAuth((prevAuth) => ({
            ...prevAuth,
            ...userData,
          }));
        } else {
          await refresh();
        }
      }
    };

    fetchData();
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.accessToken && auth.refreshToken) {
      Cookies.set("accessToken", auth.accessToken, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", auth.refreshToken, {
        secure: true,
        sameSite: "Strict",
      });
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  }, [auth.accessToken, auth.refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
