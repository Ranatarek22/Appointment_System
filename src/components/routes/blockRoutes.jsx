import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const BlockRoutes = ({ children }) => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);

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

    if (!auth.isAuthenticated) {
      verifyAuth();
    } else {
      setLoading(false);
    }
  }, [auth.isAuthenticated, refresh]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    if (auth.role === "driver") {
      return <Navigate to="/driver" replace />;
    } else if (auth.role === "maintainer") {
      return <Navigate to="/maintainer" replace />;
    }
  }

  return <>{children}</>; 
};

export default BlockRoutes;
