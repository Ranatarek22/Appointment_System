import { apiInstance } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
       
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; 
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return apiInstance(prevRequest); 
          } catch (refreshError) {
           
            console.error("Token refresh failed:", refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiInstance.interceptors.request.eject(requestIntercept);
      apiInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiInstance;
};

export default useAxiosPrivate;
