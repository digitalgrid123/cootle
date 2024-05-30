"use client";

import React, { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useRouter } from "next/navigation";
import { USER_ROLES_MAPPER } from "@/constants/keywords";
import { useAuth, useTabs } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import Navbar from "@/layouts/dashboard/header/Navbar";

const LoginPage = () => {
  const { push } = useRouter();
  const { selectedRole, setSelectedRole } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const { currentTab, setCurrentTab } = useTabs(1);

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

  const handleLogin = () => {
    push(PATH_AUTH.login);
  };

  const handleSignup = () => {
    push(PATH_AUTH.signup);
  };

  return (
    <>
      <PageTitle title="Authentication" />
      <Navbar
        disableGetStarted={false}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
      <section className="bg-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="heading">
                <h1 className="auth_main_heading">
                  Easily <span className="w-700">define</span>,
                  <span className="w-700">track</span> and
                  <span className="w-700">improve</span>
                  the <br /> value of product design in your <br /> organization
                  <span>
                    <img src="/assets/images/mark/arrow.png" alt="arrow-img" />
                  </span>
                  <span>
                    <button onClick={handleSignup}>Get started</button>
                  </span>
                </h1>
                <div className="img-software">
                  <img
                    className="img-width"
                    src="/assets/images/mark/software.webp"
                    alt="software"
                  />
                  <h2 className="thanks-text">Thanks for checking on us.</h2>
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
