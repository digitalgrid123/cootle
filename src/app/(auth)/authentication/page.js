"use client";

import React, { useEffect, useState } from "react";

// import { ChooseRole, LoginForm, VerifyOTP } from "@/components/auth";
import PageTitle from "@/components/shared/PageTitle";
import { useRouter } from "next/navigation";
import { USER_ROLES_MAPPER } from "@/constants/keywords";
import { useAuth, useTabs } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import Navbar from "@/layouts/dashboard/header/Navbar";
import HeaderBreadcrumbs from "@/components/shared/HeaderBreadcrumbs";

const LoginPage = () => {
  const { push } = useRouter();
  // States
  const { selectedRole, setSelectedRole } = useAuth();

  const [userEmail, setUserEmail] = useState("");

  // Hooks
  const { currentTab, setCurrentTab } = useTabs(1);

  // Handlers
  const next = () => {
    setCurrentTab((prev) => prev + 1);
  };

  const onSelectRole = (role) => {
    setSelectedRole(role);
    next();
  };

  const OTPSent = (email) => {
    setUserEmail(email);
    next();
  };
  const handlelLogin = () => {
    push(PATH_AUTH.login);
  };
  const handlesignup = () => {
    push(PATH_AUTH.signup);
  };

  // Render Methods
  // const renderCurrentTab = (activeTab) => {
  //   switch (activeTab) {
  //     case 1:
  //       return <ChooseRole onSelectRole={onSelectRole} />;
  //     case 2:
  //       return <LoginForm selectedRole={selectedRole} OTPSent={OTPSent} />;
  //     case 3:
  //       return <VerifyOTP userEmail={userEmail} />;
  //     default:
  //       return "";
  //   }
  // };
  return (
    <>
      <PageTitle title="Authentication" />
      <Navbar
        disableGetStarted={false}
        onLogin={handlelLogin}
        onSignup={handlesignup}
      />
      <section className="bg-main">
        <div className="container-fluid">
          <div className="row">
            <div className=" col-lg-12">
              <div className="heading">
                <h1 className="auth_main_heading">
                  Easily <span className="w-700">define</span> ,
                  <span className="w-700">track</span> and
                  <span className="w-700"> improve </span>
                  the <br /> value of product design in your <br /> organisation
                  <span>
                    <img src="/assets/images/mark/arrow.png" alt="arrow-img" />
                  </span>
                  <span>
                    <button onClick={handlesignup}>Get started</button>
                  </span>
                </h1>
                <div className="img-software">
                  <img src="/assets/images/mark/software.webp" alt="" />
                </div>
                <div>
                  <h2 className="thanks-text ">Thanks for checking on us.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
