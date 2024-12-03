import React, { useRef } from "react";
import Heading from "@/components/common/Heading";
import { cards } from "@/utils/constants";
import { useScrollHandler } from "@/hooks";

const CardLayout = ({ cards, customClass }) => {
  const scrollContainerRef = useRef(null);
  const { handleScroll, isLeftDisabled, isRightDisabled } =
    useScrollHandler(scrollContainerRef); // Use the custom hook

  const ArrowButton = ({ direction, isDisabled }) => {
    // Set the arrow image based on the direction and whether it's disabled
    const arrowImage =
      direction === "left"
        ? isDisabled
          ? "/assets/images/mark/inactive-left-arrow.svg"
          : "/assets/images/mark/active-left-arrow.svg"
        : isDisabled
        ? "/assets/images/mark/inactive-right-arrow.svg"
        : "/assets/images/mark/active-right-arrow.svg";

    return (
      <button
        className={`arrow-button ${direction} ${isDisabled ? "disabled" : ""}`}
        onClick={() => handleScroll(direction)}
        disabled={isDisabled}
      >
        <img src={arrowImage} alt={`${direction} arrow`} />
      </button>
    );
  };

  return (
    <div className={`relative ${customClass}`}>
      {/* Scrollable Cards */}
      <div
        ref={scrollContainerRef}
        className="purpose-card-container z-2 relative"
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
                &nbsp;
                <span className="purpose-card-content">{card.content}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-10 offset-lg-1">
        <div className="d-flex justify-content-end align-items-center negative-margin-end-12 mt-28">
          <ArrowButton direction="left" isDisabled={isLeftDisabled} />
          <ArrowButton direction="right" isDisabled={isRightDisabled} />
        </div>
      </div>
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
        <img
          src="/assets/images/bg-theme/ellipse5.png"
          className="purpose-gradient2 animated"
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
