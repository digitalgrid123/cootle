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
                <div className="relative">
                  <h1
                    className="auth_main_heading weight-500"
                    id="main-heading"
                  >
                    Easily
                    <span className="weight-700"> define</span>,
                    <span className="weight-700"> track</span> and
                    <span className="weight-700"> improve </span>
                    the value of product design in your <br /> organization
                  </h1>
                  <div className="content_arrow">
                    <span>
                      <img
                        loading="lazy"
                        src="/assets/images/mark/arrow.png"
                        alt="arrow-img"
                        id="arrow-img"
                      />
                    </span>
                    <span>
                      <button
                        className="started_btn weight-600"
                        onClick={handleNavigation(PATH_AUTH.signup)}
                      >
                        Get started
                      </button>
                    </span>
                  </div>
                </div>
                <div className="img-software">
                  <img
                    loading="lazy"
                    src="/assets/images/mark/software.webp"
                    alt="software"
                  />
                  <h2 className="thanks-text weight-700">
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
