"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { useRouter } from "next/navigation";
import { PATH_AUTH } from "@/routes/paths";
import Navbar from "@/layouts/dashboard/header/Navbar";
import HeroSection from "@/components/auth/LandingPage/HeroSection";
import BenefitsSection from "@/components/auth/LandingPage/BenefitSection";
import StruggleSection from "@/components/auth/LandingPage/StruggleSection";
import PurposeSection from "@/components/auth/LandingPage/PurposeSection";
import MappingSection from "@/components/auth/LandingPage/MappingSection";
import ProjectSection from "@/components/auth/LandingPage/ProjectSection";
import DocumentationSection from "@/components/auth/LandingPage/DocumentationSection";
import InsightSection from "@/components/auth/LandingPage/InsightSection";
import Footer from "@/components/auth/LandingPage/Footer";

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
  const sections = [
    BenefitsSection,
    // StruggleSection,
    // PurposeSection,
    // MappingSection,
    // ProjectSection,
    // DocumentationSection,
    // InsightSection,
  ];

  const renderSections = () => {
    return sections.map((SectionComponent, index) => (
      <React.Fragment key={index}>
        <SectionComponent />
        {index < sections.length - 1 && <div className="border-mixed"></div>}
      </React.Fragment>
    ));
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
      <HeroSection
        mainHeading=" Designer-Friendly Workload Management, Purpose-Built for Product Teams"
        paragraphText="Align product team efforts with business goals, outcomes, and values—starting where it all begins: design."
        onSignupClick={() => handleNavigation(PATH_AUTH.signup)}
        onContactClick={() => console.log("Contact us button clicked")}
      />
      <div className="merge-all-section">
        {renderSections()}
        {/* <Footer
          onSignupClick={handleNavigation(PATH_AUTH.signup)}
          onContactClick={() => console.log("Contact us button clicked")}
        /> */}
      </div>
    </>
  );
};

export default AuthPage;
