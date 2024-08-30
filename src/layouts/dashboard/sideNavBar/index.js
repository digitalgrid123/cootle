import React, { useEffect, useState } from "react";
import Menus from "./Menus";
import SidebarHeader from "./SidebarHeader";
import ProfileHeader from "./ProfileHeader";

const SideNavBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1075);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar-wrapper border_bottom_Light">
      <SidebarHeader />
      <Menus isSmallScreen={isSmallScreen} />
      <ProfileHeader />
    </div>
  );
};

export default SideNavBar;
