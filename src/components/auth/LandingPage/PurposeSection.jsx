import React, { useEffect, useRef } from "react";
import Heading from "@/components/common/Heading";

const CardLayout = ({ cards, customClass }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollDirection = 1; // 1 for forward, -1 for backward

    const smoothScroll = () => {
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth;
        const scrollLeft = scrollContainer.scrollLeft;

        // Scroll forward or backward based on direction
        if (scrollDirection === 1) {
          if (scrollLeft < scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft += 2; // Scroll at a smooth rate
          } else {
            scrollDirection = -1; // Switch to backward scrolling
          }
        } else {
          if (scrollLeft > 0) {
            scrollContainer.scrollLeft -= 2;
          } else {
            scrollDirection = 1; // Switch to forward scrolling
          }
        }
      }
    };

    const interval = setInterval(smoothScroll, 16); // 60 FPS (16ms interval)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

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
  const cards = [
    {
      label: "Clear Purpose for Every Task",
      content:
        "Each design task starts with a defined purpose, aligning teams and eliminating vague feedback.",
      className: "purpose-clear-purpose",
      img: "/assets/images/mark/task.svg",
    },
    {
      label: "Aligned Outcomes",
      content:
        "Value Mapping fosters a shared vision, reducing misunderstandings and keeping projects on track.",
      className: "purpose-aligned-outcomes",
      img: "/assets/images/mark/outcome.svg",
    },
    {
      label: "Strategic, High-Impact Design",
      content:
        "Designers focus on strategic projects, moving beyond surface-level work to deliver measurable value.",
      className: "purpose-strategic-design",
      img: "/assets/images/mark/impact.svg",
    },
    {
      label: "Measurable Design Impact",
      content:
        "Track design's impact on key metrics like revenue and customer satisfaction, proving ROI, at scale.",
      className: "purpose-measurable-impact",
      img: "/assets/images/mark/measurable.svg",
    },
  ];

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
