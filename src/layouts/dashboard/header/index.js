"use client";

import React from "react";
import Notification from "./Notification";

import { USER_ROLES } from "@/constants/keywords";
import { useAuth } from "@/hooks";

const Header = () => {
  const { user, selectedRole } = useAuth();

  const { is_superuser } = user || {};

  const handleToggleCollapse = () => {
    collapseDrawer.onToggleCollapse();
  };

  return (
    <header>
      {/* <div className="topbar d-flex align-items-center">
        <nav className="navbar navbar-expand gap-3">
          <div className="mobile-toggle-menu" onClick={handleToggleCollapse}>
            <i className="bx bx-menu"></i>
          </div>
          {is_superuser && selectedRole === USER_ROLES.SURGEON && (
            <SearchSurgery />
          )}
          {!is_superuser &&
            user &&
            [USER_ROLES.SURGEON].includes(user.role) && <SearchSurgery />}

          <div className="top-menu ms-auto">
            <ul className="navbar-nav align-items-center gap-1">
              {is_superuser && selectedRole === USER_ROLES.SURGEON && (
                <Search />
              )}
              {!is_superuser &&
                user &&
                [USER_ROLES.SURGEON].includes(user.role) && <Search />}
              {is_superuser &&
                !selectedRole &&
                user &&
                [USER_ROLES.SUPER_ADMIN].includes(user.role) && <Hospital />}

              <ThemeMode />
              <Notification />
            </ul>
          </div>
          <UserDetail user={user} />
        </nav>
      </div> */}
    </header>
  );
};

export default Header;
