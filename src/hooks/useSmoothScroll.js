// hooks/useSmoothScroll.js
import { useEffect } from "react";

const useSmoothScroll = (
  scrollContainerRef,
  scrollRate = 2,
  frameRate = 16
) => {
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollDirection = 1; // 1 for forward, -1 for backward

    const smoothScroll = () => {
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth;
        const scrollLeft = scrollContainer.scrollLeft;

        if (scrollDirection === 1) {
          if (scrollLeft < scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft += scrollRate;
          } else {
            scrollDirection = -1; // Switch direction
          }
        } else {
          if (scrollLeft > 0) {
            scrollContainer.scrollLeft -= scrollRate;
          } else {
            scrollDirection = 1; // Switch direction
          }
        }
      }
    };

    const interval = setInterval(smoothScroll, frameRate); // Smooth scroll with specified frame rate

    return () => clearInterval(interval); // Cleanup on unmount
  }, [scrollContainerRef, scrollRate, frameRate]);
};

export default useSmoothScroll;
