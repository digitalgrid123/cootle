"use client";
import Title from "@/components/Dashboard/Title";
import CompanyEditModel from "@/components/shared/model/CompanyEditModel";
import CompanySettingModel from "@/components/shared/model/CompanySettingModel";
import MemberModel from "@/components/shared/model/MemberModel";
import { useAuth } from "@/hooks";
import React, { useEffect, useState } from "react";

const Edit = () => {
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
            <CompanyEditModel activeTab={activeTab} />
            <MemberModel activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
