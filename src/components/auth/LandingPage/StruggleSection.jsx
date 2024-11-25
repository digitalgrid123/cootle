import Heading from "@/components/common/Heading";
import { bottomCards, topCards } from "@/utils/constants";
import React from "react";

const CardLayout = ({ cards, customClass }) => {
  return (
    <div className={`card-container ${customClass}`}>
      {cards.map((card, index) => (
        <div key={index} className={`card ${card.className}`}>
          <div className="card-text">
            <span>{card.label}</span>: {card.content}
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
  return (
    <section className="struggle-section relative z-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 struggle-content">
            <div className="top-cards-container">
              <CardLayout cards={topCards} customClass="padding-bottom-cards" />
            </div>
            <div className="heading-container">
              <Heading
                className="base-heading struggle-heading weight-700 text-center"
                level={1}
                text="Struggles Before Cootle"
              />
            </div>
            <div className="bottom-cards-container">
              <CardLayout cards={bottomCards} customClass="padding-top-cards" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StruggleSection;
