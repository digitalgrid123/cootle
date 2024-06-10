"use client";

import SideNavBar from "./sideNavBar";
import { useCollapseDrawer } from "@/hooks";

const DashboardLayout = ({ children }) => {
  const collapseDrawer = useCollapseDrawer();
  return (
    <div
      className={`wrapper ${collapseDrawer.collapseClick ? "toggled" : ""} ${
        collapseDrawer.collapseHover ? "sidebar-hovered" : ""
      }`}
    >
      <div
        onMouseEnter={collapseDrawer.onHoverEnter}
        onMouseLeave={collapseDrawer.onHoverLeave}
      >
        <SideNavBar />
      </div>

      <div className="page-wrapper">
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
