import React, { useEffect, useState } from "react";
import { useAuth, useCollapseDrawer } from "@/hooks";

const SidebarHeader = () => {
  const { hospitallogo, change } = useAuth();

  const [logo, setLogo] = useState(null);

  const collapseDrawer = useCollapseDrawer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await hospitallogo();
        if (result.status) {
          setLogo(result.data.logo);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    // Fetch data whenever change is true or when it changes from undefined or null to true
    if (change || change == undefined || change == null) {
      fetchData();
    }
  }, [hospitallogo, change]);

  const handleToggleCollapse = () => {
    collapseDrawer.onToggleCollapse();
  };

  return (
    <div className="sidebar-header">
      <div>
        <img
          src="/assets/images/mark/cootle.svg"
          className="logo-sm"
          alt="logo icon"
        />
        <div style={{ width: "55px" }}>
          <img
            src={logo ? logo : "/assets/images/mark/cootle.svg"}
            alt="logo icon"
            className="w-100"
          />
        </div>
      </div>
      <div className="toggle-icon ms-auto" onClick={handleToggleCollapse}>
        <i className="bx bx-arrow-back"></i>
      </div>
    </div>
  );
};

export default SidebarHeader;
