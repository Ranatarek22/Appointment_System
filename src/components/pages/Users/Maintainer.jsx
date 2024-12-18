import React, { useState } from "react";
import Sidebar from "../../navigation/Sidebar";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TableForMaintainer from "./TableForMaintainer";

const Maintainer = () => {
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
        <TableForMaintainer />
      </div>
    </div>
  );
};

export default Maintainer;
