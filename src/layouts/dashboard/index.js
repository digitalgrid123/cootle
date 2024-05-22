"use client";
import BackToTop from "./backToTop";
import Footer from "./footer";
import Header from "./header";
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

      <Header />
      <div className="page-wrapper">
        <div className="page-content">{children}</div>
      </div>
      <div className="overlay toggle-icon"></div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
