import React, { useState, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES, USER_ROLES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useGlobalCompany } from "@/utils/globalState";
import { getData } from "@/utils/storage";

const CompanyModel = ({ activeTab }) => {
  const selectedCompany = useGlobalCompany();
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  const { push } = useRouter();
  const editCompany = () => {
    push(PATH_DASHBOARD.createcompany.edit);
  };
  return (
    <>
      {activeTab === "settings" && (
        <>
          <div className="setting-box d-flex align-items-center justify-content-between border_bottom_Semi-Transparent_navy ">
            <h1 className="company-setup-heading weight-600">Settings</h1>
            {isAdmin && (
              <button className="save-btn" onClick={editCompany}>
                <span className="weight-600">Edit</span>
              </button>
            )}
          </div>
          <form>
            <div className="company-container border_bottom_Semi-Transparent_navy ">
              <label
                className="label-company weight-500 "
                htmlFor="companyName"
              >
                Company Name
              </label>
              <h2 className="selected_company weight-600">
                {selectedCompany?.name}
              </h2>
            </div>
            <div>
              <label
                className="label-company weight-500  margin-11"
                htmlFor="logoFile"
              >
                Icon
              </label>
              <div className="custom-file-input">
                {selectedCompany?.logo ? (
                  <div className="selected_logo border-pale ">
                    <img
                      className="w-100"
                      src={selectedCompany.logo}
                      alt={`${selectedCompany}logo`}
                    />
                  </div>
                ) : (
                  <div className="no_logo_container border-pale ">
                    <h2 className="no_logo weight-500">
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

export default CompanyModel;
