import React, { useRef } from "react";
import Heading from "@/components/common/Heading";
import { cards } from "@/utils/constants";
import { useSmoothScroll } from "@/hooks";

const CardLayout = ({ cards, customClass }) => {
  const scrollContainerRef = useRef(null);

  // Use the custom hook for smooth scrolling
  useSmoothScroll(scrollContainerRef);

  return (
    <div
      ref={scrollContainerRef}
      className={`purpose-card-container ${customClass}`}
      style={{
        display: "flex",
        overflowX: "auto",
        scrollBehavior: "smooth",
      }}
    >
      {cards.map((card, index) => (
        <div key={index} className={`purpose-card ${card.className}`}>
          <div className="purpose-card-content">
            <img
              src={card.img}
              alt={card.label}
              className="purpose-card-image"
            />
            <p>
              <span className={`purpose-card-label ${card.className}`}>
                {card.label}:
              </span>
              {card.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const PurposeSection = () => {
  return (
    <section className="purpose-section relative">
      <div className="container-fluid">
        <img
          src="/assets/images/bg-theme/ellipse8.png"
          className="purpose-gradient animated"
          alt="background ellipse"
        />
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <Heading
              className="base-heading text-start weight-700 mb-32"
              level={1}
              text="How Cootle Transforms Product Teams"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <CardLayout cards={cards} customClass="demo-class" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
