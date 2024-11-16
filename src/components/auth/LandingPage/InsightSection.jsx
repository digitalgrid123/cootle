import Heading from "@/components/common/Heading";
import React from "react";

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
            <div className="gridalign-right">
              <div className="content">
                <img
                  src="/assets/images/bg-theme/ellipse1.png"
                  alt="background gradient"
                  className="gradient-insight1 animated"
                />
                <img
                  src="/assets/images/bg-theme/ellipse5.png"
                  alt="background gradient"
                  className="gradient-insight2 animated"
                />

                <Heading
                  className="base-heading text-start weight-700 mb-24"
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
                    <li key={index} className="insight-item">
                      <div className="mapping-heading">
                        <strong
                          className={
                            index === 0
                              ? "gradient-purple-lavender-right "
                              : "gradient-purple-lavender-image "
                          }
                        >
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