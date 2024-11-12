import Heading from "@/components/common/Heading";
import React from "react";
import Ellipse2 from "./Ellipses/Ellipse2";

const DocumentationSection = () => {
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="gradient-documentation">
              <Ellipse2 />
            </div>

            <div className="gridalign-right">
              <div className="content">
                <Heading
                  className="base-heading purpose-heading weight-700 mb-24"
                  level={1}
                  text="Design Effort Documentation"
                />
                <p className="mapping-heading mb-32 weight-500 ">
                  <span className="text-gradient weight-600">
                    Transparent and Accountable Workflows
                  </span>{" "}
                  Our streamlined process lets designers easily document task
                  outcomes, enabling product managers to{" "}
                  <span style={{ color: "#a66ccf" }} className="weight-600">
                    assess impact and value
                  </span>
                  . Each effort is reviewed, providing clarity on whether value
                  has been realised and ensuring accountability across the team.
                </p>
              </div>
            </div>
            <img
              src="/assets/images/bg-theme/documenation.png"
              alt="project section"
              className="z-2 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
