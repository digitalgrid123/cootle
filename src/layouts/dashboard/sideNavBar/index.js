import React from "react";
import Menus from "./Menus";
import SidebarHeader from "./SidebarHeader";
import ProfileHeader from "./ProfileHeader";

const SideNavBar = () => {
  return (
    <div className="sidebar-wrapper">
      <SidebarHeader />
      <Menus />
      <ProfileHeader />
    </div>
  );
};

export default SideNavBar;
