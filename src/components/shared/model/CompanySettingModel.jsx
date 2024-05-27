import React, { useState, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const CompanySettingModel = ({ activeTab }) => {
  const { createcompany, setcompany } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { toaster } = useToaster();

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
    if (!logoFile || !companyName) {
      toaster("Company name and logo are required.", TOAST_TYPES.ERROR);
      return;
    }

    try {
      const response = await createcompany(companyName, logoFile);
      console.log("🚀 ~ handleSave ~ response:", response);

      if (response.status) {
        toaster(response.message, TOAST_TYPES.SUCCESS);
        setcompany(true);
        setLogoFile(null);
        setFilePreview(null);
        setCompanyName("");
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

  return (
    <>
      {activeTab === "settings" && (
        <>
          <div className="setting-box d-flex align-item-center justify-content-between">
            <h1 className="company-setup-heading">Settings</h1>
            <button className="save-btn" onClick={handleSave}>
              <span>Save</span>
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="company-container">
              <label className="label-company" htmlFor="companyName">
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
            </div>
            <div>
              <label className="label-company margin-11" htmlFor="logoFile">
                Icon
              </label>
              <div className="custom-file-input">
                {filePreview ? (
                  <div className="file-preview-container">
                    <img
                      src={filePreview}
                      alt="File Preview"
                      className="file-preview"
                    />
                    <button
                      type="button"
                      className="remove-file-button"
                      onClick={handleRemoveFile}
                    >
                      Remove Icon
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="custom-file-button"
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
              <p className="organization-note">
                Upload your company logo in PNG format.
              </p>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CompanySettingModel;
