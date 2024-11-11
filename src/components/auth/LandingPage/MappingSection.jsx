import Heading from "@/components/common/Heading";
import React from "react";

const MappingSection = () => {
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <img
              src="/assets/images/bg-theme/ellipse9.png"
              alt="background gradient"
              className="mapping-graient"
            />
            <Heading
              className="base-heading purpose-heading weight-700 mb-24"
              level={1}
              text="Value Mapping"
            />
            <p className="mapping-heading mb-32 weight-500">
              Cootle's Value Mapping helps teams map{" "}
              <span className="color-rose weight-600">
                predefined product tasks—like user testing
              </span>{" "}
              , to{" "}
              <span className="color-lavender weight-600">
                specific business goals—such as revenue growth
              </span>
              , ensuring that every action contributes directly to an overall
              strategy. This shared understanding of purpose enables teams to
              deliver measurable, valuable results.
            </p>
            <img
              src="/assets/images/bg-theme/mapping.png"
              alt="mapping section"
              className="z-2 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MappingSection;
