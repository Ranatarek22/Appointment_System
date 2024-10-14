import { useEffect, useState } from "react";
import LoginForm from "./components/forms/loginForm";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unautharized";
import LinkPage from "./components/LinkPage";
import SignUpForm from "./components/forms/registerForm";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequiredAuth";
import Home from "./components/pages/Home";
import Driver from "./components/pages/Users/Driver";
import Maintainer from "./components/pages/Users/Maintainer";
import BlockRoutes from "./components/routes/blockRoutes";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";
import { AppointmentProvider } from "./components/context/AppointmentProvider";

function App() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();


  return (
    // <Maintainer />
    
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route
          path="login"
          element={
            <BlockRoutes>
              <LoginForm />
            </BlockRoutes>
          }
        />
        <Route
          path="register"
          element={
            <BlockRoutes>
              <SignUpForm />
            </BlockRoutes>
          }
        />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" index element={<Home />} />

        {/* Protected Routes - Role based access */}
        <Route element={<RequireAuth allowedRoles={["driver"]} />}>
          <Route path="driver" element={<Driver />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["maintainer"]} />}>
   
            <Route path="maintainer" element={<Maintainer />} />
     
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
