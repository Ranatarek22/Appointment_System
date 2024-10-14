// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./components/context/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AppointmentProvider } from "./components/context/AppointmentProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* <AppointmentProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      {/* </AppointmentProvider> */}
    </AuthProvider>
  </StrictMode>
);
