import React, { useState, useRef, useEffect } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { setSelectedCompany, useGlobalCompany } from "@/utils/globalState";

const CompanySettingModel = ({ activeTab, setShowPopup }) => {
  const { createcompany, editcompany } = useAuth();
  const selectedCompany = useGlobalCompany();

  const [companyName, setCompanyName] = useState(selectedCompany?.name || "");
  const [logoFile, setLogoFile] = useState(null);
  const [filePreview, setFilePreview] = useState(selectedCompany?.logo || null);
  const fileInputRef = useRef(null);
  const { push } = useRouter();
  const { toaster } = useToaster();

  useEffect(() => {
    setCompanyName(selectedCompany?.name || "");
    setFilePreview(selectedCompany?.logo || null);
  }, [selectedCompany]);

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
    if (!companyName) {
      toaster("Company name is required.", TOAST_TYPES.ERROR);
      return;
    }

    try {
      let logoToSend = logoFile;

      // If logoFile is null, send an empty string to indicate removal
      if (logoFile === null) {
        logoToSend = "";
      }

      const response = await editcompany(companyName, logoToSend);

      if (response.status) {
        toaster(response.message, TOAST_TYPES.SUCCESS);
        push(PATH_DASHBOARD.createcompany.root);
        setSelectedCompany({
          ...selectedCompany,
          name: companyName,
          logo: logoToSend ? URL.createObjectURL(logoFile) : null,
        });
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
          <div className="setting-box d-flex align-items-center justify-content-between border_bottom_soft-lavender ">
            <h1 className="company-setup-heading weight-600">Settings</h1>
            <button className="save-btn" onClick={handleSave}>
              <span className="weight-600">Save</span>
            </button>
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
              <p className="organization-note weight-400">
                Upload an image here. Company logo is great!
              </p>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CompanySettingModel;
