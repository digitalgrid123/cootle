import React, { useEffect, useState, useRef } from "react";
import { useNotifications } from "@/hooks";
import NotificationModel from "@/components/shared/model/NotificationModel";

const SidebarHeader = React.forwardRef((props, ref) => {
  const { count } = useNotifications();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [logoSrc, setLogoSrc] = useState("/assets/images/mark/logo.svg");

  const handleBellClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1075) {
        setLogoSrc("/assets/images/mark/mobile-logo.svg");
      } else {
        setLogoSrc("/assets/images/mark/logo.svg");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="sidebar-header mt-24" ref={ref}>
      <div className="pb-24 d-flex align-items-center justify-content-between w-100 border_bottom_Light">
        <div className="cootle-container">
          <img
            src={logoSrc}
            alt="logo"
            style={{ cursor: "pointer" }}
            title="Transforming ideas into elegant designs—where creativity meets functionality."
          />
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
        dropdownRef={dropdownRef}
      />
    </div>
  );
});

export default SidebarHeader;
