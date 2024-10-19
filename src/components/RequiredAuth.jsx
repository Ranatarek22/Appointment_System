import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("User role:", auth?.role);


  if (auth?.isAuthenticated) {
    if (allowedRoles?.includes(auth.role)) {
      return <Outlet />;
    } else if (auth.role === "") {
      return <Outlet />;
    }
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
