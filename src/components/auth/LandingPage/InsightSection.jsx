import Heading from "@/components/common/Heading";
import React from "react";
import Ellipse2 from "./Ellipses/Ellipse2";
import Ellipse3 from "./Ellipses/Ellipse3";

const InsightSection = () => {
  const data = [
    {
      label: "Value Proportion Analysis",
      description:
        "Understand how design efforts support Identity, Functional, Financial, and Experiential Value.",
    },
    {
      label: "Design Effort Focus Ratio",
      description:
        "Track the distribution of effort across key design areas—User Research, Usability, Information Architecture, and more.",
    },
    {
      label: "Business Objectives Proportion Analysis",
      description:
        "See how design contributes to business goals like revenue growth, innovation, and operational efficiency.",
    },
  ];
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="gradient-insight1">
              <Ellipse2 />
            </div>
            <div className="gradient-insight2">
              <Ellipse3 width={300} height={300} />
            </div>

            <div className="gridalign-right">
              <div className="content">
                <Heading
                  className="base-heading purpose-heading weight-700 mb-24"
                  level={1}
                  text="Insight on Design Impact"
                />
                <p className="mapping-heading mb-32 weight-500 ">
                  Insight dashboard predicts, categorises, and visualises the
                  value of design efforts in real-time. See exactly where your
                  design team’s efforts are making a difference.
                </p>
                <ul className="insight-list mb-32">
                  {data.map((item, index) => (
                    <li key={index} className="insight-item ">
                      <div className="mapping-heading">
                        <strong style={{ color: "#a66ccf" }}>
                          {item.label}
                        </strong>
                        : {item.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <img
              src="/assets/images/bg-theme/insight.png"
              alt="project section"
              className="z-2 relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
