import React, { useRef, useEffect, useState } from "react";
import Menus from "./Menus";
import SidebarHeader from "./SidebarHeader";
import ProfileHeader from "./ProfileHeader";

const SideNavBar = () => {
  const sidebarHeaderRef = useRef(null);
  const profileHeaderRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [profileHeight, setProfileHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1075);
    };

    const updateHeaderHeights = () => {
      setHeaderHeight(sidebarHeaderRef.current?.offsetHeight || 0);
      setProfileHeight(profileHeaderRef.current?.offsetHeight || 0);
    };

    // Initial check
    handleResize();
    updateHeaderHeights();

    // Add event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", updateHeaderHeights);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateHeaderHeights);
    };
  }, []);

  return (
    <div className="sidebar-wrapper border_bottom_Light">
      <SidebarHeader ref={sidebarHeaderRef} />
      <Menus
        isSmallScreen={isSmallScreen}
        headerHeight={headerHeight}
        profileHeight={profileHeight}
      />
      <ProfileHeader ref={profileHeaderRef} />
    </div>
  );
};

export default SideNavBar;
