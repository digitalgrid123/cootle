import React from "react";

const HeroSection = ({
  mainHeading,
  paragraphText,
  onSignupClick,
  onContactClick,
}) => {
  return (
    <section className="bg-main min-vh-100 z-2">
      <img
        src="/assets/images/bg-theme/ellipse1.png"
        className="image-1"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse2.png"
        className="image-2"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse1.png"
        className="image-3"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse3.png"
        className="image-4"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse3.png"
        className="image-5"
        alt="background ellipse"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="heading">
              <h1
                className="auth_main_heading weight-700 mb-28"
                id="main-heading"
              >
                {mainHeading ||
                  "Designer-Friendly Workload Management, Purpose-Built for Product Teams"}
              </h1>
              <div className="row">
                <div className="col-lg-10 offset-lg-1">
                  <p className="auth_main_paragraph weight-500">
                    {paragraphText ||
                      "Align product team efforts with business goals, outcomes, and values—starting where it all begins: design."}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-4 mt-40">
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
