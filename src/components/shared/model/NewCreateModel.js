import React, { useState, useRef, useEffect } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useGlobalCompany } from "@/utils/globalState";
import eventBus from "@/utils/eventBus";

const NewCreateModel = ({
  activeTab,
  setShowPopup,
  showPopup,
  previous,
  currentTab,
}) => {
  const { createcompany, setcompany } = useAuth();
  const selectedCompany = useGlobalCompany();

  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { push } = useRouter();
  const { toaster } = useToaster();

  // useEffect(() => {
  //   setCompanyName(selectedCompany?.name || "");
  //   setFilePreview(selectedCompany?.logo || null);
  // }, [selectedCompany]);

  const handleInputChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setLogoFile(null);
      setFilePreview(null);
      return;
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toaster("Only PNG, JPG, and JPEG files are allowed.", TOAST_TYPES.ERROR);
      fileInputRef.current.value = ""; // Clear the input
      setLogoFile(null);
      setFilePreview(null);
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setLogoFile(null);
    setFilePreview(null);
    fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!companyName) {
      toaster("Company name is required.", TOAST_TYPES.ERROR);
      return;
    }

    try {
      let logoToSend = logoFile;
      if (!logoFile) {
        logoToSend = null;
      }

      const response = await createcompany(companyName, logoToSend);

      if (response.status) {
        toaster(response.message, TOAST_TYPES.SUCCESS);
        push(PATH_DASHBOARD.createcompany.root);
        eventBus.emit("companyCreated");
        setcompany(response);
        setShowPopup(true);
      } else {
        toaster(response.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!companyName) {
      console.error("Company name is required.");
      return;
    }
    await handleSave();
  };

  const handleClose = () => {
    setShowPopup(false); // Close the popup when "Close" button is clicked
  };

  return (
    <>
      {activeTab === "settings" && (
        <>
          <div className="setting-box d-flex align-items-center justify-content-between border_bottom_soft-lavender ">
            <h1 className="company-setup-heading weight-500">Settings</h1>
            <div className="d-flex align-items-center gap-3">
              {selectedCompany && showPopup && (
                <button className="close_btn" onClick={handleClose}>
                  <span className="weight-600">Close</span>
                </button>
              )}
              {showPopup && currentTab && (
                <button className="close_btn" onClick={previous}>
                  <span className="weight-600">Back</span>
                </button>
              )}
              <button
                className="update_btn"
                onClick={handleSave}
                disabled={companyName.trim() === ""}
              >
                <span className="weight-600">Save</span>
              </button>
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="company-container border_bottom_soft-lavender ">
              <label
                className="label-company weight-500 "
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="input-company"
                name="companyName"
                placeholder="Enter your company name"
                required
                value={companyName}
                onChange={handleInputChange}
              />
              <p className="organization-note weight-400 p-0 mb-0  ml-12">
                Use your organisation or company name. Keep it short and simple.
              </p>
            </div>
            <div>
              <label
                className="label-company weight-500  margin-11"
                htmlFor="logoFile"
              >
                Icon
              </label>
              <div className="custom-file-input">
                {filePreview ? (
                  <div className="file-preview-container d-flex align-items-center">
                    <div className="company-logo-preview">
                      <img
                        src={filePreview}
                        alt="File Preview"
                        className="file-preview"
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-file-button weight-500"
                      onClick={handleRemoveFile}
                    >
                      Remove Icon
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="custom-file-button weight-500 border-pastel  "
                    onClick={() => fileInputRef.current.click()}
                  >
                    <span className="plus-icon">
                      <img
                        src="/assets/images/mark/second-plus.svg"
                        alt="plus-icon"
                      />
                    </span>
                  </button>
                )}
                <input
                  type="file"
                  id="logoFile"
                  name="logo"
                  accept="image/png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
              <p className="organization-note weight-400 p-0 mb-0 ">
                Upload an image here. Company logo is great!
              </p>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default NewCreateModel;
