import { useEffect } from "react";
import { apiInstance } from "../axios";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
  
    if (!auth?.role) {
      console.log("User is not authenticated. Skipping token refresh.");
      return; 
    }

    try {
      console.log(auth.refreshToken);

      const response = await apiInstance.post(
        "/users/token/refresh/",
        { refresh: auth?.refreshToken },
        { withCredentials: true }
      );

      const newAccessToken = response.data.access;

      setAuth((prev) => {
        console.log("Previous Auth: loll:", JSON.stringify(prev));
        console.log("New Access Token: loll:", newAccessToken);

        Cookies.set("accessToken", newAccessToken, {
          secure: true,
          sameSite: "Strict",
        });

        return {
          ...prev,
          accessToken: newAccessToken,
          isAuthenticated: prev?.isAuthenticated,
        };
      });

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    if (!auth?.role) {
      console.log("User is not authenticated. Skipping token refresh.");
      return; // Skip the API call if the user is not authenticated
    }

    const intervalId = setInterval(() => {
      refresh();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [auth?.refreshToken]);

  return refresh;
};

export default useRefreshToken;
