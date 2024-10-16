import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const BlockRoutes = ({ children }) => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = auth?.isAuthenticated;
  const role = auth?.role;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await refresh(); 
      } catch (error) {
        console.error("Token refresh failed", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      verifyAuth();
    } else {
      
      if (role === "driver") {
        navigate("/driver", { replace: true });
      } else if (role === "maintainer") {
        navigate("/maintainer", { replace: true });
      } else {
        setLoading(false); 
      }
    }
  }, [isAuthenticated, refresh, navigate, role]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>; 
};

export default BlockRoutes;
