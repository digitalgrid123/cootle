"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import { useTabs } from "@/hooks";
import VerifyEmail from "@/components/auth/VerifyEmail";
import Navbar from "@/layouts/dashboard/header/Navbar";
import VerifyPassCode from "@/components/auth/VerifyPassCode";
import { backgroundImages } from "@/utils/constants";

const Signup = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { currentTab, setCurrentTab } = useTabs(1);

  const [userEmail, setUserEmail] = useState("");

  // Handlers
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  const handlelogin = () => {
    push(PATH_AUTH.login);
  };

  // Render Methods
  const renderCurrentTab = (activeTab) => {
    switch (activeTab) {
      case 1:
        return <VerifyEmail setUserEmail={setUserEmail} next={next} />;
      case 2:
        return <VerifyPassCode userEmail={userEmail} />;
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar
        disableGetStarted={pathname === PATH_AUTH.signup}
        onLogin={handlelogin}
      />
      <section className="bg-image  min-vh-100 d-flex justify-content-center pt-270 pb-270 ">
        {backgroundImages.map((src, index) => (
          <img
            key={index}
            src={src}
            className={`image-${index + 1} animated`}
            alt={`background ellipse ${index + 1}`}
          />
        ))}
        <div className="container-fluid">
          <div className="col-lg-6 padding-24  offset-lg-3 d-flex justify-content-center">
            <div className="authentication-box">
              {renderCurrentTab(currentTab)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
