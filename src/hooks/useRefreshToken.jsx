import { useEffect } from "react";
import { apiInstance } from "../axios";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    if (!auth?.refreshToken) {
      console.log("No refresh token available. Skipping refresh.");
      return;
    }

    try {
      const response = await apiInstance.post(
        "/users/token/refresh/",
        { refresh: auth.refreshToken },
        { withCredentials: true }
      );

      const newAccessToken = response.data.access;
      console.log(newAccessToken);

      setAuth((prev) => ({
        ...prev,
        accessToken: newAccessToken,
        isAuthenticated: true, 
      }));

      Cookies.set("accessToken", newAccessToken, {
        secure: true,
        sameSite: "Strict",
      });

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    if (auth?.refreshToken) {
      refresh();
    }
  }, [auth?.refreshToken]);

  return refresh;
};

export default useRefreshToken;
