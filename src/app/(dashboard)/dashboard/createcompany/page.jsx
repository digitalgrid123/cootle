"use client";
import Title from "@/components/Dashboard/Title";
import CompanyModel from "@/components/shared/model/CompanyModel";

import MemberModel from "@/components/shared/model/MemberModel";
import { useAuth } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import React, { useEffect, useState } from "react";

const createcompany = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const settingsIcon =
    activeTab === "settings"
      ? "/assets/images/mark/setting-active.svg"
      : "/assets/images/mark/setting-inactive.svg";
  const membersIcon =
    activeTab === "members"
      ? "/assets/images/mark/member-active.svg"
      : "/assets/images/mark/member-inactive.svg";

  return (
    <div className="h-100 d-flex flex-column">
      <div className="mb-20 title-content-container custom-padding ">
        <Title title="Company" />
      </div>
      <div className="box-content">
        <div className="wrapper-company">
          <div className="company-sidebar h-100">
            <h1 className="company-setup-heading weight-600">Company setup</h1>
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
            </ul>
          </div>
          <div className="company-content h-100 d-flex flex-column">
            <CompanyModel activeTab={activeTab} />

            <MemberModel activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default createcompany;
