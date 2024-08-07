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

  // Define icon paths
  const settingsIcon =
    activeTab === "settings"
      ? "/assets/images/mark/setting-active.svg"
      : "/assets/images/mark/setting-inactive.svg";
  const membersIcon =
    activeTab === "members"
      ? "/assets/images/mark/member-active.svg"
      : "/assets/images/mark/member-inactive.svg";

  return (
    <div>
      {showPopup && (
        <div ref={overlayRef} className="invitation-overlay padding-company">
          <div ref={contentRef} className="invitation-content w-100 h-100">
            <div className="wrapper-company">
              <div className="company-sidebar h-100">
                <h1 className="company-setup-heading weight-500 padding-left-20">
                  Company setup
                </h1>
                <ul className="">
                  <li
                    className={`d-flex align-items-center justify-content-start gap-2 ${
                      activeTab === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <img src={settingsIcon} alt="Settings Icon" />
                    <h2
                      className={`menutext f-16 weight-500 ${
                        activeTab === "settings"
                          ? "menutext-active"
                          : "menutext-inactive"
                      }`}
                    >
                      Settings
                    </h2>
                  </li>

                  {user?.is_admin && (
                    <li
                      className={`d-flex align-items-center justify-content-start gap-2 ${
                        activeTab === "members" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("members")}
                    >
                      <img src={membersIcon} alt="Members Icon" />
                      <h2
                        className={`menutext f-16 weight-500 ${
                          activeTab === "members"
                            ? "menutext-active"
                            : "menutext-inactive"
                        }`}
                      >
                        Members
                      </h2>
                    </li>
                  )}
                </ul>
              </div>
              <div className="company-content h-100">
                <NewCreateModel
                  activeTab={activeTab}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                />
                <MemberModel
                  activeTab={activeTab}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewModel;
