import { useAuth } from "@/hooks";
import React, { useEffect, useState } from "react";

const ProfileHeader = () => {
  const { userinfo, useradd } = useAuth();
  console.log("🚀 ~ ProfileHeader ~ useradd:", useradd);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();

      if (res && res.status) {
        setUser(res.data);
      }
    };

    fetchUserinfo();
  }, [userinfo, useradd]);
  return (
    <div className="metismenu-profile bottom-profile  d-flex align-items-center flex-row cursor-pointer justify-content-between">
      <div className="d-flex align-items-center" style={{ gap: "11px" }}>
        <div className="profile-img relative">
          <img
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            src="/assets/images/mark/profile.jpg"
            alt="profile"
          />
          <img
            className="indicator"
            src="/assets/images/mark/indicator.svg"
            alt="indicator-icon"
          />
        </div>
        <div>
          <h1 className="profile-name">
            {user?.fullname && user.fullname !== "User#<built-in function id>"
              ? user.fullname
              : ""}
          </h1>

          <p className="profile-email">{user?.email}</p>
        </div>
      </div>
      <div>
        <img src="/assets/images/mark/dropdown.svg" alt="dropdown-icon" />
      </div>
    </div>
  );
};

export default ProfileHeader;
