import React, { useEffect } from "react";

const Loader = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fullscreen-loader">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
