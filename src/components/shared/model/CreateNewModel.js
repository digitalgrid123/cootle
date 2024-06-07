import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks";
import CompanySettingModel from "./CompanySettingModel";
import MemberModel from "./MemberModel";
import NewCreateModel from "./NewCreateModel";
import { useGlobalCompany } from "@/utils/globalState";

const CreateNewModel = ({ showPopup, setShowPopup, contentRef }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const { user } = useAuth();
  const selectedCompany = useGlobalCompany();

  const overlayRef = useRef(null);

  useEffect(() => {
    if (!selectedCompany) return;

    const handleClickOutside = (event) => {
      if (
        overlayRef.current &&
        overlayRef.current.contains(event.target) &&
        contentRef.current && // Add null check for contentRef.current
        !contentRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup, selectedCompany, contentRef]);

  return (
    <div>
      {showPopup && (
        <div ref={overlayRef} className="invitation-overlay padding-company">
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
                <NewCreateModel
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

export default CreateNewModel;
