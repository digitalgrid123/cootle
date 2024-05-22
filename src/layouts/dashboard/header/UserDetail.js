"use client";

import React from "react";
import { USER_ROLES_MAPPER } from "@/constants/keywords";

const UserDetail = ({ user }) => {
  return (
    <div className="user-box dropdown px-3">
      <a
        className="d-flex align-items-center nav-link gap-3 dropdown-toggle-nocaret"
        href="#"
      >
        <img
          src={user?.profile_image || "https://picsum.photos/200"}
          className="user-img"
          alt="user avatar"
        />
        <div className="user-info">
          <p className="user-name mb-0">{`${user?.first_name} ${user?.last_name}`}</p>
          <p className="designattion mb-0">
            {user?.role ? USER_ROLES_MAPPER[user?.role] : ""}
          </p>
        </div>
      </a>
    </div>
  );
};

export default UserDetail;
