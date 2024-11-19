import Heading from "@/components/common/Heading";
import React from "react";

const Footer = ({ onSignupClick, onContactClick }) => {
  return (
    <footer className="pb-26">
      <div className=" bg-footer relative">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <img
                src="/assets/images/bg-theme/ellipse1.png"
                alt="background gradient"
                className="footer-gradient1 animated hide-on-small-devices"
              />
              <img
                src="/assets/images/bg-theme/ellipse2.png"
                alt="background gradient"
                className="footer-gradient2 animated hide-on-small-devices"
              />

              <img
                src="/assets/images/bg-theme/ellipse3.png"
                alt="background gradient"
                className="footer-gradient3 animated hide-on-small-devices"
              />

              <img
                src="/assets/images/bg-theme/ellipse1.png"
                alt="background gradient"
                className="footer-gradient4 animated hide-on-small-devices"
              />

              <div className="d-flex flex-column align-items-center content">
                <div className="cootle-container mb-32">
                  <img
                    src="/assets/images/mark/cootle-logo.svg"
                    alt="logo"
                    title="Transforming ideas into elegant designs—where creativity meets functionality."
                  />
                </div>
                <Heading
                  className="footer-heading weight-700 mb-28"
                  level={1}
                  text="Empower Your Product Team to Drive Real Business Value."
                />
                <p className="footer-paragraph mb-40 mobile-mb-24 weight-500 ">
                  Align product team efforts with business goals, outcomes, and
                  values—starting where it all begins: design.
                </p>

                <div className="d-flex justify-content-center align-items-center gap-4 mt-40 mobile-m-0 ">
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
          </div>
        </div>
      </div>
      <h4 className="thanks-text  mb-16">Thanks for checking on us.</h4>
      <h5 className="copyright-text"> © 2024 Cootle.</h5>
    </footer>
  );
};

export default Footer;
