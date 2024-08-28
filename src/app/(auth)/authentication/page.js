"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useRouter } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import Navbar from "@/layouts/dashboard/header/Navbar";

const AuthPage = () => {
  const { push } = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Update the isMobile state based on the viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this threshold as needed
    };

    // Set initial state
    handleResize();

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => (event) => {
    if (isMobile) {
      setShowContent(true);
      event.preventDefault(); // Prevent navigation on mobile
    } else {
      push(path);
    }
  };

  return (
    <>
      <PageTitle title="Authentication" />
      <Navbar
        showContent={showContent}
        setShowContent={setShowContent}
        disableGetStarted={false}
        onLogin={handleNavigation(PATH_AUTH.login)}
        onSignup={handleNavigation(PATH_AUTH.signup)}
      />
      <section className="bg-main min-vh-100">
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
                  <span className="span-started_btn">
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
