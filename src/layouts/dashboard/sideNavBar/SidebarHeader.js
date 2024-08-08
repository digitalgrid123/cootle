import React, { useEffect, useState, useRef } from "react";
import { useNotifications } from "@/hooks";
import Link from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";
import NotificationModel from "@/components/shared/model/NotificationModel";

const SidebarHeader = () => {
  const { count } = useNotifications(); // Get the count of unread notifications
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage the dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown element

  const handleBellClick = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown state
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar-header mt-24 ">
      <div className="pb-24 d-flex align-items-center justify-content-between w-100 border_bottom_Light">
        <div className="cootle-container">
          <img src="/assets/images/mark/logo.svg" alt="logo" />
        </div>

        <div
          className="relative"
          onClick={handleBellClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/assets/images/mark/bell.svg"
            alt="bell"
            style={{ width: "24px" }}
          />
          {count > 0 && <span className="notification-badge"></span>}
        </div>
      </div>

      <NotificationModel
        isDropdownOpen={isDropdownOpen}
        setDropdownOpen={setDropdownOpen}
        dropdownRef={dropdownRef} // Pass dropdownRef to NotificationModel
      />
    </div>
  );
};

export default SidebarHeader;
