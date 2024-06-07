import React, { useState, useEffect, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const ProfileFormModel = ({ togglePopup, popupOpen, setPopupOpen }) => {
  const { user, updateuser, setuseradd } = useAuth();
  const { toaster } = useToaster();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [email, setEmail] = useState("");

  const fileInputRef = useRef(null); // Reference for hidden file input
  const formRef = useRef(null); // Reference for the form element

  useEffect(() => {
    if (user) {
      const fullName = user.fullname || "";
      setEmail(user.email || "");
      const nameParts = fullName.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts[1] || "");
      setProfilePic(user.profile_pic || "");
    }
  }, [user]);

  useEffect(() => {
    if (profilePic instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(profilePic);
    } else {
      setProfilePicPreview("");
    }
  }, [profilePic]);

  const handleLogoChange = async (event) => {
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
              <div className="border_setting d-flex align-items-center justify-content-between">
                <h2 className="my_profile_setting">My account settings</h2>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="close_btn"
                    type="button"
                    onClick={togglePopup}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="update_btn"
                    onClick={handleUpdateClick}
                  >
                    <span>Update</span>
                  </button>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="d-flex align-items-center gap-4 profile-input-border">
                  <div className="form-group_profile">
                    <label htmlFor="first-name" className="label_profile">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="profile-input"
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="form-group_profile">
                    <label htmlFor="last-name" className="label_profile">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="profile-input"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="form_groupimage">
                  <label
                    htmlFor="profile-pic"
                    className="label-company margin-11"
                  >
                    Image
                  </label>
                  <button
                    type="button"
                    className="profile-file-button"
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
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "14px" }}
                    >
                      <div className="profile-previewbox">
                        <img
                          src={profilePicPreview}
                          alt="Profile Preview"
                          className="profile-pic-preview"
                        />
                      </div>
                      <button
                        type="button"
                        className="profile-file-btn"
                        onClick={handleRemoveFile}
                      >
                        Remove Icon
                      </button>
                    </div>
                  )}
                  <div>
                    <p className="upload_note">Upload your image here. </p>
                  </div>
                </div>
                <div className="email_container">
                  <h4 className="email_profile_text">Email</h4>
                  <p className="profile_email">{email}</p>
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
