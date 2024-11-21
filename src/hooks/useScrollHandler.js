import { useState } from "react";

const useScrollHandler = (scrollContainerRef) => {
  const [isLeftDisabled, setLeftDisabled] = useState(true);
  const [isRightDisabled, setRightDisabled] = useState(false);

  const handleScroll = (direction) => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 200; // Adjust the amount to scroll

    if (scrollContainer) {
      const newScrollPosition =
        direction === "left"
          ? scrollContainer.scrollLeft - scrollAmount
          : scrollContainer.scrollLeft + scrollAmount;

      // Smooth scroll
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      // Update button states after a short delay to allow smooth scrolling to complete
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setLeftDisabled(scrollLeft <= 0);
        setRightDisabled(scrollLeft + clientWidth >= scrollWidth);
      }, 300); // Delay matches the smooth scroll duration
    }
  };

  return { handleScroll, isLeftDisabled, isRightDisabled };
};

export default useScrollHandler;
