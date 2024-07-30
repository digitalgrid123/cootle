import React, { useState, useEffect, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const ProfileFormModel = ({ togglePopup, popupOpen, setPopupOpen }) => {
  const { userinfo, updateuser, setuseradd } = useAuth();
  const { toaster } = useToaster();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [email, setEmail] = useState("");

  const fileInputRef = useRef(null); // Reference for hidden file input
  const formRef = useRef(null); // Reference for the form element

  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();
      if (res && res.status) {
        const fullName = res.data.fullname || "";
        setEmail(res.data.email || "");
        const nameParts = fullName.split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts[1] || "");
        setProfilePic(res.data.profile_pic || "");
      }
    };
    fetchUserinfo();
  }, [userinfo]);

  useEffect(() => {
    if (profilePic instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(profilePic);
    } else {
      setProfilePicPreview(profilePic || "");
    }
  }, [profilePic]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    } else {
      setProfilePic(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullName = `${firstName} ${lastName}`;
    try {
      const res = await updateuser(fullName, profilePic);
      if (!res.status) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } else {
        toaster(res.message, TOAST_TYPES.SUCCESS);
        setuseradd(res);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleRemoveFile = () => {
    setProfilePic(null);
    setProfilePicPreview("");
    fileInputRef.current.value = "";
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  return (
    <>
      {popupOpen && (
        <div className="invitation-overlay">
          <div className="proflie-content">
            <div className="detail-profile-box">
              <div className="border_setting border_bottom_soft-lavender d-flex align-items-center justify-content-between">
                <h2 className="my_profile_setting weight-600">
                  My account settings
                </h2>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="close_btn"
                    type="button"
                    onClick={togglePopup}
                  >
                    <span className="weight-600">Close</span>
                  </button>
                  <button
                    type="button"
                    className="update_btn"
                    onClick={handleUpdateClick}
                  >
                    <span className="weight-600">Update</span>
                  </button>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="d-flex align-items-center gap-4 profile-input-border border_bottom_soft-lavender">
                  <div className="form-group_profile">
                    <label
                      htmlFor="first-name"
                      className="label_profile weight-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="profile-input f-16 weight-400 "
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="form-group_profile">
                    <label
                      htmlFor="last-name"
                      className="label_profile weight-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="profile-input f-16 weight-400 "
                      placeholder="Last Name"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="form_groupimage border_bottom_purple-haze ">
                  <label
                    htmlFor="profile-pic"
                    className="label-profile weight-500 margin-11"
                  >
                    Image
                  </label>
                  <button
                    type="button"
                    className="profile-file-button p-0"
                    onClick={() => fileInputRef.current.click()}
                    style={{ display: profilePicPreview ? "none" : "block" }}
                  >
                    <span className="profile-icon">
                      <img
                        className="profile-preview-icon"
                        src={`${
                          profilePic || "/assets/images/mark/profile.png"
                        }`}
                        alt="profile-icon"
                      />
                    </span>
                  </button>
                  <input
                    type="file"
                    id="profile-pic"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                  {profilePicPreview && (
                    <div className="d-flex align-items-center">
                      <div className="profile-previewbox">
                        <img
                          src={profilePicPreview}
                          alt="Profile Preview"
                          className="profile-pic-preview"
                        />
                      </div>
                      <button
                        type="button"
                        className="profile-file-btn weight-500"
                        onClick={handleRemoveFile}
                      >
                        Remove Icon
                      </button>
                    </div>
                  )}
                  <div>
                    <p className="upload_note weight-400 m-0">
                      Upload your image here.{" "}
                    </p>
                  </div>
                </div>
                <div className="email_container">
                  <h4 className="email_profile_text weight-500">Email</h4>
                  <p className="profile_email f-16 weight-400">{email}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFormModel;
