"use client";
import Title from "@/components/Dashboard/Title";
import CompanySettingModel from "@/components/shared/model/CompanySettingModel";
import MemberModel from "@/components/shared/model/MemberModel";
import { useAuth } from "@/hooks";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="h-100">
      <div className="mb-20 ">
        <Title title="Company" />
      </div>
      <div className="invitation-content" style={{ height: "95%" }}>
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
                <img src="/assets/images/mark/setting.svg" alt="setting-icon" />
                <h2 className="menutext">Settings</h2>
              </li>
            </ul>
          </div>
          <div className="company-content h-100">
            <CompanySettingModel activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
