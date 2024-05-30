import React, { useState, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useGlobalCompany } from "@/utils/globalState";

const CompanyEditModel = ({ activeTab, setShowPopup }) => {
  const selectedCompany = useGlobalCompany();
  const { push } = useRouter();
  const editCompany = () => {
    push(PATH_DASHBOARD.createcompany.root);
  };
  return (
    <>
      {activeTab === "settings" && (
        <>
          <div className="setting-box d-flex align-item-center justify-content-between">
            <h1 className="company-setup-heading">Settings</h1>
            <button className="save-btn" onClick={editCompany}>
              <span>Edit</span>
            </button>
          </div>
          <form>
            <div className="company-container">
              <label className="label-company" htmlFor="companyName">
                Company Name
              </label>
              <h2 className="selected_company">{selectedCompany?.name}</h2>
            </div>
            <div>
              <label className="label-company margin-11" htmlFor="logoFile">
                Icon
              </label>
              <div className="custom-file-input">
                {selectedCompany?.logo ? (
                  <div className="selected_logo">
                    <img
                      className="w-100"
                      src={selectedCompany.logo}
                      alt={`${selectedCompany}logo`}
                    />
                  </div>
                ) : (
                  <div className="no_logo_container">
                    <h2 className="no_logo">
                      {selectedCompany?.name?.charAt(0).toUpperCase()}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CompanyEditModel;
