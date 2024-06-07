"use client";
import React, { useEffect, useRef, useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useAuth, useTabs } from "@/hooks";
import UserModel from "@/components/shared/model/UserModel";
import InvitationModel from "@/components/shared/model/InvitationModel";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import MainMap from "@/components/Dashboard/valuemapping/MainMap";
import { useGlobalCompany } from "@/utils/globalState";

const Dashboard = () => {
  const { user } = useAuth();
  const selectedCompany = useGlobalCompany();
  const [showPopup, setShowPopup] = useState(false);
  const { currentTab, setCurrentTab } = useTabs(1);
  const contentRef = useRef();

  useEffect(() => {
    const shouldShowPopup =
      user && user?.fullname?.startsWith("User#") && !selectedCompany;
    setShowPopup(shouldShowPopup);
  }, [user, selectedCompany]);

  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return (
          <UserModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            next={next}
          />
        );
      case 2:
        return (
          <InvitationModel
            showPopup={showPopup && !selectedCompany}
            setShowPopup={setShowPopup}
            next={next}
            contentRef={contentRef}
          />
        );
      case 3:
        return (
          <CreateNewModel
            showPopup={showPopup && !selectedCompany}
            setShowPopup={setShowPopup}
            contentRef={contentRef}
          />
        );
      default:
        return null;
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
