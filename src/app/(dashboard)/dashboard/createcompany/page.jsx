"use client";
import Title from "@/components/Dashboard/Title";
import CompanySettingModel from "@/components/shared/model/CompanySettingModel";
import { useAuth } from "@/hooks";
import React, { useEffect, useState } from "react";

const createcompany = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const { userinfo } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();

      if (res && res.status) {
        setUser(res.data);
      }
    };

    fetchUserinfo();
  }, [userinfo]);
  return (
    <div className="h-100">
      <Title title="Company" />
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
            <CompanySettingModel activeTab={activeTab} />
            {activeTab === "members" && (
              <div className="setting-box">
                <h1 className="company-setup-heading">
                  Add / Remove People from the company
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default createcompany;
