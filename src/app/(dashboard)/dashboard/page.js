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

const Dashboard = () => {
  const { userinfo } = useAuth();
  const [user, setUser] = useState(null);

  const [userName, setUserName] = useState(user || "");
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

  // Update userName whenever user is updated
  useEffect(() => {
    if (user) {
      setUserName(user);
    }
  }, [user]);

  // Advance to the next tab
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  // Check if the user's name is invalid and toggle popup visibility
  useEffect(() => {
    if (!userName || userName.startsWith("User#")) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [userName]);

  // Handle clicks outside the content area to close the popup
  const handleClickOutside = (event) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target) &&
      (currentTab === 2 || currentTab === 3)
    ) {
      setShowPopup(false);
    }
  };

  // Add and remove event listener for clicks outside the content area
  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [currentTab]);

  // Render content based on the current tab
  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return (
          <UserModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUserName}
            userName={userName}
            next={next}
          />
        );
      case 2:
        return (
          <InvitationModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUserName}
            userName={userName}
            next={next}
            contentRef={contentRef}
          />
        );
      case 3:
        return (
          <CompanyModel
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setUserName={setUserName}
            userName={userName}
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
      <Title title="Value mapping" />
      {renderCurrentTab(currentTab)}
    </>
  );
};

export default Dashboard;
