import Link from "next/link";
import React from "react";
import { useNotifications } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";

const Notification = () => {
  // Hooks
  const { count } = useNotifications();

  return (
    <li className="nav-item dark-mode d-none d-sm-flex">
      <Link className="nav-link" href={PATH_DASHBOARD.notifications}>
        <i className="bx bx-bell position-relative">
          {count > 0 && (
            <p className="custom-badge custom-badge-danger custom-badge-counter">
              {count}
            </p>
          )}
        </i>
      </Link>
    </li>
  );
};

export default Notification;
