import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("hi" + auth?.role);

  return allowedRoles?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.role === "" ? (
    // <Outlet />
         <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    //  <Navigate to="/unauthorized" state={{ from: location }} replace />
    <Navigate to="/login" />
  );
};

export default RequireAuth;
