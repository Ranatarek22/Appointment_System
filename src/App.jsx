import { useEffect, useState } from "react";
import Login from "./components/pages/Auth/Login";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unautharized";
import LinkPage from "./components/LinkPage";
import Register from "./components/pages/Auth/Register";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequiredAuth";
import Home from "./components/pages/HomePage/Home";
import Driver from "./components/pages/Users/Driver";
import Maintainer from "./components/pages/Users/Maintainer";
import BlockRoutes from "./components/routes/blockRoutes";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";
import { AppointmentProvider } from "./components/context/AppointmentProvider";
import Appointments from "./components/pages/Appointments/AppointmentsDriverTable";
import DriverAppointments from "./components/pages/Appointments/DriverAppointments";
import MaintainerAppointments from "./components/pages/Appointments/MaintainerAppointments";
import { useTranslation } from "react-i18next";

function App() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
    const { i18n } = useTranslation();

    useEffect(() => {
      const currentLang = i18n.language;
      const direction = currentLang === "ar" ? "rtl" : "ltr";

      document.documentElement.lang = currentLang;
      document.documentElement.dir = direction;
    }, [i18n.language]);


  return (
    // <Appointments />

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route
          path="login"
          element={
            <BlockRoutes>
              <Login />
            </BlockRoutes>
          }
        />
        <Route
          path="register"
          element={
            <BlockRoutes>
              <Register />
            </BlockRoutes>
          }
        />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          index
          element={
            // <BlockRoutes>
            <Home />
            // </BlockRoutes>
          }
        />

        {/* Protected Routes - Role-based access */}
        <Route element={<RequireAuth allowedRoles={["driver"]} />}>
          <Route path="driver" element={<Driver />} />
          <Route path="/drivappoint" element={<DriverAppointments />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["maintainer"]} />}>
          <Route path="maintainer" element={<Maintainer />} />
          <Route path="/maintappoint" element={<MaintainerAppointments />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
