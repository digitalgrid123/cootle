import { backgroundImages } from "@/utils/constants";
import React from "react";

const HeroSection = ({
  mainHeading,
  paragraphText,
  onSignupClick,
  onContactClick,
}) => {
  return (
    <section className="bg-main min-vh-100 ">
      {backgroundImages.map((src, index) => (
        <img
          key={index}
          src={src}
          className={`image-${index + 1} animated`}
          alt={`background ellipse ${index + 1}`}
        />
      ))}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="content-paddingtop">
              <h1
                className="auth_main_heading weight-700 mb-28"
                id="main-heading"
              >
                {mainHeading}
              </h1>
              <div className="row">
                <div className="col-lg-10 offset-lg-1">
                  <p className="auth_main_paragraph weight-500">
                    {paragraphText}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-4 mt-40 mobile-mt-20 flex-mobile-column gap-mobile-2  gap-mobie-3">
                <button
                  className="started_btn btn-base weight-600"
                  onClick={onSignupClick}
                >
                  Get started for free
                </button>
                <button
                  className="contact_btn btn-base weight-600"
                  onClick={onContactClick}
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-10 offset-lg-1">
            <div className="img-software">
              <img
                className="software-icon"
                loading="lazy"
                src="/assets/images/mark/software.webp"
                alt="software"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
