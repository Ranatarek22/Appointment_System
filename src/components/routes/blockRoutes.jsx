import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const BlockRoutes = ({ children }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth?.isAuthenticated; 
  const role = auth?.role; 
  
  console.log(isAuthenticated + role);

  if (isAuthenticated) {
    if (role === "driver") {
      return <Navigate to="/driver" />;
    } else if (role === "maintainer") {
      return <Navigate to="/maintainer" />;
    }
  }

  return <>{children}</>; 
};

export default BlockRoutes;
