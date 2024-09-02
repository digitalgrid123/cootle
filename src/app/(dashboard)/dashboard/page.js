"use client";
import React, { useEffect, useRef, useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useAuth, useTabs } from "@/hooks";
import UserModel from "@/components/shared/model/UserModel";
import InvitationModel from "@/components/shared/model/InvitationModel";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import MainMap from "@/components/Dashboard/valuemapping/MainMap";
import { useGlobalCompany } from "@/utils/globalState";
import eventBus from "@/utils/eventBus";

const Dashboard = () => {
  const { userinfo } = useAuth();
  const [user, setUser] = useState(null);
  const selectedCompany = useGlobalCompany();

  const [showPopup, setShowPopup] = useState(false);
  const { currentTab, setCurrentTab } = useTabs(getInitialTab());

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

  // Determine initial tab based on localStorage or default to 1
  function getInitialTab() {
    const storedTab = localStorage.getItem("currentTab");
    return storedTab ? parseInt(storedTab) : 1;
  }

  // Store current tab in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  // Effect to show popup if user starts with "User#"
  useEffect(() => {
    if (user && user.startsWith("User#")) {
      setShowPopup(true);
    }
  }, [user]);

  // Advance to the next tab
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };
  const previous = () => {
    setCurrentTab((prev) => (prev > 1 ? prev - 1 : prev));
  };
  // Render the current tab based on currentTab state
  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return (
          <UserModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            next={next}
            selectedCompany={selectedCompany}
          />
        );
      case 2:
        return (
          <InvitationModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            next={next}
            contentRef={contentRef}
            previous={previous}
          />
        );
      case 3:
        return (
          <CreateNewModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            contentRef={contentRef}
            previous={previous}
            currentTab={currentTab}
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
