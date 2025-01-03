import Heading from "@/components/common/Heading";
import React from "react";

const DocumentationSection = () => {
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="gridalign-right">
              <img
                src="/assets/images/bg-theme/ellipse3.png"
                alt="background gradient"
                className="gradient-documentation2"
              />
              <img
                src="/assets/images/bg-theme/ellipse5.png"
                alt="background gradient"
                className="gradient-documentation hide-on-small-devices"
              />

              <div className="content">
                <Heading
                  className="base-heading text-start weight-700 mb-24"
                  level={1}
                  text="Design Effort Documentation"
                />
                <p className="mapping-heading mb-32 weight-500 ">
                  <span className="gradient-purple-fade-pink  weight-600">
                    Transparent and Accountable Workflows&nbsp;
                  </span>
                  - Our streamlined process lets designers easily document task
                  outcomes, enabling product managers to&nbsp;
                  <span className="gradient-blue-pink-left   weight-600">
                    assess impact and value
                  </span>
                  . Each effort is reviewed, providing clarity on whether value
                  has been realised and ensuring accountability across the team.
                </p>
              </div>
            </div>
            <img
              src="/assets/images/bg-theme/documentation.webp"
              alt="project section"
              className="z-2 relative image-max-width"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
