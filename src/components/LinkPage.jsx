import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth"; // Assuming your custom hook handles auth state

const LinkPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      if (auth.role === "driver") {
        navigate("/driver"); // Redirect driver to the driver page
      } else if (auth.role === "maintainer") {
        navigate("/maintainer"); // Redirect maintainer to the maintainer page
      }
    }
  }, [auth, navigate]);

  return (
    <section>
      <h1>Navigation</h1>
      <br />

      {/* Public Links */}
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <br />
      <h2>Private</h2>

      {/* Private Links, conditionally shown based on user role */}
      {auth?.isAuthenticated ? (
        <>
          <Link to="/">Home</Link>
          {auth.role === "driver" && <Link to="/driver">Driver Page</Link>}
          {auth.role === "maintainer" && (
            <Link to="/maintainer">Maintainer Page</Link>
          )}
        </>
      ) : (
        <p>Please log in to see private links.</p>
      )}
    </section>
  );
};

export default LinkPage;
