import Heading from "@/components/common/Heading";
import React from "react";

const CardLayout = ({ cards, customClass }) => {
  return (
    <div className={`card-container ${customClass}`}>
      {cards.map((card, index) => (
        <div key={index} className={`card ${card.className}`}>
          <div className="card-text">
            <span>{card.label}:</span>
            {card.content}
            <span>
              {card.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`image-${idx}`}
                  style={{
                    marginLeft: "1px",
                    transform: "translateY(-2px)",
                  }}
                />
              ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const StruggleSection = () => {
  const topCards = [
    {
      label: "Unclear Design Expectations",
      className: "rotate-10-46",
      content:
        "Vague feedback ('Make it better or Make it more intuitive') leads to misaligned design outcomes and team frustrations!",
      images: [
        "/assets/images/mark/sad.png",
        "/assets/images/mark/eye.png",
        "/assets/images/mark/message.png",
      ],
    },
    {
      label: "Outcome Misalignment",
      className: "rotate-0",
      content:
        "Lack of shared understanding between product teams, resulting in divergent goals and misaligned priorities! ",
      images: ["/assets/images/mark/recycle.png"],
    },
    {
      label: "Difficulty Measuring Design Impact",
      className: "rotate-15",
      content:
        "No clear way to track how design contributes to business metrics, at scale!",
      images: ["/assets/images/mark/people.png "],
    },
  ];

  const bottomCards = [
    {
      label: "Surface-level Design Work",
      className: "rotate-7-11",
      content:
        "Designers limited to visual tweaks and pixel adjustments, unable to contribute to strategic, high-impact work!",
      images: ["/assets/images/mark/pencil.png"],
    },
    {
      label: "Disconnect Between Leadership and Product Teams",
      className: "rotate--1-64",
      content:
        "Leadership lacks visibility into design's business impact, hindering advocacy and executive support!",
      images: ["/assets/images/mark/cancel.png"],
    },
    {
      label: "Limited Resource Visibility",
      className: "rotate--10-47",
      content:
        "Teams lack clarity on how design resources are allocated across research, usability, and visual design, making optimisation difficult!",
      images: ["/assets/images/mark/doubleeye.png"],
    },
  ];

  return (
    <section className="struggle-section relative z-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <CardLayout cards={topCards} customClass="padding-bottom-cards" />

            <Heading
              className="base-heading struggle-heading weight-700"
              level={1}
              text="Struggles Before Cootle"
            />
            <CardLayout cards={bottomCards} customClass="padding-top-cards" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StruggleSection;
