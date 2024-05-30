"use client";
import React, { useEffect, useRef, useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { USER_ROLES } from "@/constants/keywords";
import { useAuth, useTabs } from "@/hooks";
import HeaderBreadcrumbs from "@/components/shared/HeaderBreadcrumbs";
import UserModel from "@/components/shared/model/UserModel";
import InvitationModel from "@/components/shared/model/InvitationModel";
import CompanyModel from "@/components/shared/model/CompanyModel";
import Title from "@/components/Dashboard/Title";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import MainMap from "@/components/Dashboard/valuemapping/MainMap";

const Dashboard = () => {
  const { userinfo } = useAuth();
  const [user, setUser] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const { currentTab, setCurrentTab } = useTabs(1);
  const contentRef = useRef();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();

      if (res && res.status) {
        setUser(res.data.fullname);
      }
    };

    fetchUserinfo();
  }, [userinfo]);

  // Advance to the next tab
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  // Check if the user's name is invalid and toggle popup visibility
  useEffect(() => {
    if (user && user.startsWith("User#")) {
      setShowPopup(true);
    }
  }, [user]);

  // Render content based on the current tab
  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return (
          <UserModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUser}
            userName={user}
            next={next}
          />
        );
      case 2:
        return (
          <InvitationModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUser}
            userName={user}
            next={next}
            contentRef={contentRef}
          />
        );
      case 3:
        return (
          <CreateNewModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUser}
            userName={user}
            contentRef={contentRef}
          />
        );
      default:
        return "";
    }
  };

  return (
    <>
      <PageTitle title="Dashboard" />
      <MainMap />
      {renderCurrentTab(currentTab)}
    </>
  );
};

export default Dashboard;
