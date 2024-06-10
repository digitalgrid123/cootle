import React from "react";
// Assuming this is the path to your Notification component
import { useNotifications } from "@/hooks";
import Link from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";

const SidebarHeader = () => {
  const { count } = useNotifications(); // Get the count of unread notifications

  return (
    <div className="sidebar-header">
      <div className="sidebar-notify d-flex align-items-center justify-content-between w-100 border_bottom_Light">
        <Link className="cootle-container" href={PATH_DASHBOARD.root}>
          <img src="/assets/images/mark/logo.svg" alt="logo" />
        </Link>

        <Link className="relative" href={PATH_DASHBOARD.notification}>
          <img src="/assets/images/mark/shape.svg" alt="bell" />
          {count > 0 && <span className="notification-badge"></span>}
        </Link>
      </div>
    </div>
  );
};

export default SidebarHeader;
