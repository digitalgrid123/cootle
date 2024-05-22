import React from "react";
import Menus from "./Menus";
import SidebarHeader from "./SidebarHeader";

const SideNavBar = () => {
  return (
    <div className="sidebar-wrapper">
      <SidebarHeader />
      <Menus />
    </div>
  );
};

export default SideNavBar;
