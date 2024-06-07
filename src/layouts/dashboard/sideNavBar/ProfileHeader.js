import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks";
import ProfileFormModel from "@/components/shared/model/ProfileFormModel";

const ProfileHeader = () => {
  const { userinfo, useradd, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null);
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const togglePopup = () => {
    setPopupOpen((prev) => !prev);
    setDropdownOpen(false);
    document.body.style.overflow = popupOpen ? "auto" : "hidden";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isValidFullName = (fullname) => {
    return fullname && !fullname.startsWith("User#");
  };

  return (
    <>
      <div
        className="metismenu-profile bottom-profile d-flex align-items-center flex-row cursor-pointer justify-content-between"
        onClick={toggleDropdown}
      >
        <div className="d-flex align-items-center" style={{ gap: "11px" }}>
          <div className="profile-img relative">
            <img
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              src={user?.profile_pic || "/assets/images/mark/profile.png"}
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
              {isValidFullName(user?.fullname) ? user.fullname : ""}
            </h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
        <div>
          <img src="/assets/images/mark/dropdown.svg" alt="dropdown-icon" />
        </div>
      </div>

      {dropdownOpen && (
        <ul
          ref={dropdownRef}
          className="profile-dropdown d-flex gap-2 flex-column"
        >
          <h2 className="account_text">My account setting</h2>
          <div
            className=" border-profile d-flex align-items-center justify-content-between w-100"
            onClick={togglePopup}
          >
            <div className="profile-setting_container">
              <img
                src="/assets/images/mark/setting_profile.svg"
                alt="profile-settings"
              />
              <h4 className="cursor-pointer">Name & email update</h4>
            </div>
            <div>
              <img src="/assets/images/mark/arrowright.svg" alt="arrow-right" />
            </div>
          </div>
          <div className="logout_container cursor-pointer" onClick={logout}>
            <img src="/assets/images/mark/logout.svg" alt="logout" />
            <h1 className="logout-text">Logout</h1>
          </div>
        </ul>
      )}

      <ProfileFormModel
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
        profilePicPreview={user?.profilePic || ""}
        togglePopup={togglePopup}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
      />
    </>
  );
};

export default ProfileHeader;
