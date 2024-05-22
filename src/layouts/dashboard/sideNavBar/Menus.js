import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LOGOUT_KEY,
  NAV_CONFIG_BOTTOM,
  NAV_CONFIG,
} from "@/constants/attributes";
import { useAuth } from "@/hooks";
import { USER_ROLES } from "@/constants/keywords";

const Menus = () => {
  // Hooks
  const { logout, user, selectedRole } = useAuth();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { is_superuser } = user || {};
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerHeight < 740);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Define the roles to be considered based on conditions
  let rolesToConsider = [];
  if (!selectedRole && is_superuser) {
    rolesToConsider.push(USER_ROLES.SUPER_ADMIN);
  } else if (selectedRole === USER_ROLES.SURGEON && is_superuser) {
    rolesToConsider.push(USER_ROLES.SURGEON);
  } else if (selectedRole === USER_ROLES.HOSPITAL && is_superuser) {
    rolesToConsider.push(USER_ROLES.HOSPITAL);
  } else {
    rolesToConsider.push(user?.role);
  }

  // Filter the navigation links based on user's role or conditions
  const filteredConfig = NAV_CONFIG.filter(({ roles }) => {
    return roles.some((role) => rolesToConsider.includes(role));
  });
  const filteredNavConfig = NAV_CONFIG_BOTTOM.filter((item) => {
    if (is_superuser) {
      if (selectedRole === USER_ROLES.HOSPITAL && is_superuser) {
        return item.id === 41 || item.id === LOGOUT_KEY || item.id === 43;
      } else if (!selectedRole && is_superuser) {
        return (
          item.id === 41 ||
          item.id === LOGOUT_KEY ||
          item.id === 43 ||
          item.id === 42
        );
      } else if (selectedRole === USER_ROLES.SURGEON && is_superuser) {
        return item.id === 41 || item.id === LOGOUT_KEY || item.id === 43;
      }
    } else {
      if (user.role === "hospital") {
        return item.id === 41 || item.id === LOGOUT_KEY || item.id === 43;
      } else if (user.role === "superAdmin") {
        return (
          item.id === 41 ||
          item.id === LOGOUT_KEY ||
          item.id === 43 ||
          item.id === 42
        );
      } else if (user.role === "surgeon") {
        return item.id === 41 || item.id === LOGOUT_KEY || item.id === 43;
      }
    }

    return false;
  });

  return (
    <ul className="metismenu" id="menu">
      <li className="menu-label">Menus</li>
      <div className={isSmallScreen ? "menu-scroll" : ""}>
        {filteredConfig.map(({ id, title, path, icon }) => (
          <li key={id}>
            <Link href={path} className="text-decoration-none">
              <div className="parent-icon">
                <i className={`bx ${icon}`} />
              </div>
              <div className="menu-title">{title}</div>
            </Link>
          </li>
        ))}
      </div>
      {filteredNavConfig.map(({ id, title, path, icon }, index) => (
        <li
          className={
            index === filteredNavConfig.length - 1
              ? "lastthree"
              : id === LOGOUT_KEY
              ? "lasttwo"
              : id === 41
              ? "lastone"
              : "lastfour"
          }
          key={id}
        >
          <Link
            href={path}
            className="text-decoration-none"
            onClick={id === LOGOUT_KEY ? logout : () => {}}
          >
            <div className="parent-icon">
              <i className={`bx ${icon}`} />
            </div>
            <div className="menu-title">{title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
