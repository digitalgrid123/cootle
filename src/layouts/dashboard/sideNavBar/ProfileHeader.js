import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks";
import ProfileFormModel from "@/components/shared/model/ProfileFormModel";

const ProfileHeader = () => {
  const { userinfo, useradd, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
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
        className="metismenu-profile bottom-profile d-flex align-items-center flex-row cursor-pointer justify-content-between border_top-white "
        onClick={toggleDropdown}
      >
        <div className="d-flex align-items-center gap-2">
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
          </div>
          <div>
            <h1 className="profile-name weight-400">
              {isValidFullName(user?.fullname) ? user.fullname : ""}
            </h1>
            <p className="profile-email m-0 weight-400 ">{user?.email}</p>
          </div>
        </div>
        <div>
          <img
            src="/assets/images/mark/dropdown.svg"
            alt="dropdown-icon"
            className={dropdownOpen ? "dropdown-icon open" : "dropdown-icon"}
          />
        </div>
      </div>

      {dropdownOpen && (
        <ul
          ref={dropdownRef}
          className="profile-dropdown d-flex gap-2 flex-column"
        >
          <h2 className="account_text border_bottom_bluish weight-500">
            My account setting
          </h2>
          <div
            className=" border-profile d-flex align-items-center justify-content-between w-100 border_bottom_bluish"
            onClick={togglePopup}
          >
            <div className="profile-setting_container">
              <img
                src="/assets/images/mark/setting_profile.svg"
                alt="profile-settings"
              />
              <h4 className="cursor-pointer weight-500">Name & email update</h4>
            </div>
            <div>
              <img src="/assets/images/mark/arrowright.svg" alt="arrow-right" />
            </div>
          </div>
          <div className="logout_container cursor-pointer " onClick={logout}>
            <img src="/assets/images/mark/logout.svg" alt="logout" />
            <h1 className="logout-text weight-500">Logout</h1>
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
