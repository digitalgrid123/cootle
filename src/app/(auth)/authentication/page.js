"use client";

import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useRouter } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import Navbar from "@/layouts/dashboard/header/Navbar";

const AuthPage = () => {
  const { push } = useRouter();

  const handleNavigation = (path) => () => push(path);

  return (
    <>
      <PageTitle title="Authentication" />
      <Navbar
        disableGetStarted={false}
        onLogin={handleNavigation(PATH_AUTH.login)}
        onSignup={handleNavigation(PATH_AUTH.signup)}
      />
      <section className="bg-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="heading">
                <h1 className="auth_main_heading weight-400" id="main-heading">
                  <span className="weight-600"> Define</span>,
                  <span className="weight-600"> track</span> and
                  <span className="weight-600"> improve </span>
                  the value of product design in your organization.
                </h1>
                <div className="content_arrow mt-24 ">
                  <span>
                    <img
                      loading="lazy"
                      src="/assets/images/mark/arrow.png"
                      alt="arrow-img"
                      className="arrow-img"
                    />
                  </span>
                  <span>
                    <button
                      className="started_btn weight-500"
                      onClick={handleNavigation(PATH_AUTH.signup)}
                    >
                      Get started
                    </button>
                  </span>
                </div>
                <div className="img-software">
                  <img
                    className="software-icon"
                    loading="lazy"
                    src="/assets/images/mark/software.webp"
                    alt="software"
                  />
                  <h2 className="thanks-text weight-500 mb-16">
                    Thanks for checking on us.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
