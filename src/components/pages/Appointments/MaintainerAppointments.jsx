import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Appointments from "./AppointmentsMaintainerTable";
import Sidebar from "../../navigation/Sidebar";
const MaintainerAppointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative flex h-screen">
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 z-20"
      >
        <MenuIcon style={{ fontSize: "2rem", color: "black" }} />
      </button>

      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

      <div className="flex-grow lg:mr-[20%] md:mr-[30%] p-4 bg-gray-100 overflow-y-auto">
        <Appointments />
      </div>
    </div>
  );
};

export default MaintainerAppointments;
