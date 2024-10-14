import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
// import useRefreshToken from "../hooks/useRefreshToken";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const refresh = useRefreshToken();
  const logout = async () => {
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <section>
      {auth?.role === "driver" && <Navigate to="/driver" />}
      {auth?.role === "maintainer" && (
        <Navigate to="/maintainer" state={{ from: location }} replace />
      )}
      <br />
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
