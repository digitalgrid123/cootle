"use client";

import SideNavBar from "./sideNavBar";


const DashboardLayout = ({ children }) => {

  return (
    <div
      className={`wrapper`}
    >
      <div
       
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
