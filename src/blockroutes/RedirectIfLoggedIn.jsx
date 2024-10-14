import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../components/context/AuthProvider";

const RedirectAuth = () => {
  const { auth } = useContext(AuthContext);

  // If user is logged in, redirect to home or their role page
  if (auth?.role === "driver") {
    return <Navigate to="/driver" replace />;
  } else if (auth?.role === "maintainer") {
    return <Navigate to="/maintainer" replace />;
  }

  // If not logged in, render the intended component (login or register)
  return <Outlet />;
};

export default RedirectAuth;
