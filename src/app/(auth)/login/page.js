"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import { useTabs } from "@/hooks";
import VerifyEmail from "@/components/auth/VerifyEmail";
import Navbar from "@/layouts/dashboard/header/Navbar";
import VerifyPassCode from "@/components/auth/VerifyPassCode";

const login = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { currentTab, setCurrentTab } = useTabs(1);

  const [userEmail, setUserEmail] = useState("");

  // Handlers
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  const handleSignup = () => {
    push(PATH_AUTH.signup);
  };

  // Render Methods
  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return <VerifyEmail setUserEmail={setUserEmail} next={next} />;
      case 2:
        return <VerifyPassCode userEmail={userEmail} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar
        disableLogin={pathname === PATH_AUTH.login}
        onSignup={handleSignup}
        disableGetStarted={false}
      />
      <section className="bg-main vh-100 pt-270">
        <div className="container-fluid">
          <div className="row">
            <div className="padding-24  col-lg-6 offset-lg-3 d-flex justify-content-center">
              <div className="authentication-box">
                {renderCurrentTab(currentTab)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
