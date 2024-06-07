import React, { useState, useRef, useEffect } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import CompanySettingModel from "./CompanySettingModel";
import MemberModel from "./MemberModel";

const CompanyModel = ({ showPopup, setShowPopup, contentRef }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const { user } = useAuth();

  return (
    <div>
      {showPopup && (
        <div className="invitation-overlay padding-company">
          <div ref={contentRef} className="invitation-content w-100 h-100">
            <div className="wrapper-company">
              <div className="company-sidebar h-100">
                <h1 className="company-setup-heading">Company setup</h1>
                <ul className="">
                  <li
                    className={`d-flex align-items-center justify-content-start gap-2 ${
                      activeTab === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <img src="/assets/images/mark/setting.svg" alt="" />
                    <h2 className="menutext">Settings</h2>
                  </li>
                  {user?.is_admin && (
                    <li
                      className={`d-flex align-items-center justify-content-start gap-2 ${
                        activeTab === "members" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("members")}
                    >
                      <img src="/assets/images/mark/member.svg" alt="" />
                      <h2 className="menutext">Members</h2>
                    </li>
                  )}
                </ul>
              </div>
              <div className="company-content h-100">
                <CompanySettingModel
                  activeTab={activeTab}
                  setShowPopup={setShowPopup}
                />
                <MemberModel activeTab={activeTab} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyModel;
