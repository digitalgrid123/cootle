import React, { useEffect, useState } from "react";

const SidebarHeader = () => {
  return (
    <div className="sidebar-header">
      <div className=" sidebar-notify d-flex align-items-center justify-content-between w-100">
        <div className="cootle-container">
          <img src="/assets/images/mark/logo.svg" alt="logo" />
        </div>

        <div>
          <img src="/assets/images/mark/shape.svg" alt="bell" />
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
