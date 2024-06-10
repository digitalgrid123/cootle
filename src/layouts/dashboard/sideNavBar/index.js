import React from "react";
import Menus from "./Menus";
import SidebarHeader from "./SidebarHeader";
import ProfileHeader from "./ProfileHeader";

const SideNavBar = () => {
  return (
    <div className="sidebar-wrapper border_bottom_Light">
      <SidebarHeader />
      <Menus />
      <ProfileHeader />
    </div>
  );
};

export default SideNavBar;
