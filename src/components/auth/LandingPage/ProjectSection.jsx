import Heading from "@/components/common/Heading";
import React from "react";
import Ellipse1 from "./Ellipses/Ellipse1";

const ProjectSection = () => {
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="gradient-project">
              <Ellipse1 />
            </div>

            <div className="gridalign-right">
              <div className="content">
                <Heading
                  className="base-heading purpose-heading weight-700 mb-24"
                  level={1}
                  text="Design Task Assignment"
                />
                <p className="mapping-heading mb-32 weight-500 ">
                  <span className="text-gradient weight-600">
                    Purpose-Driven Task Assignment
                  </span>{" "}
                  keeps everyone aligned with the{" "}
                  <span className="blend-text-gradient weight-600">"why"</span>{" "}
                  behind each design effort. Every task{" "}
                  <span style={{ color: "#a66ccf" }} className="weight-600">
                    starts with Purpose{" "}
                  </span>{" "}
                  , ensuring that each product team member strategically
                  contributes to the company’s overall goals and vision.
                </p>
              </div>
            </div>
            <img
              src="/assets/images/bg-theme/project.png"
              alt="project section"
              className="z-2 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
