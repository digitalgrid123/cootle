import React from "react";

const Title = ({ title }) => {
  // Check if the title should not be truncated
  const shouldTruncate = !(title === "Value mapping");

  return (
    <h1
      className={`page-title-heading weight-500 ${
        shouldTruncate ? "truncate" : ""
      }`}
      title={title}
    >
      {title}
    </h1>
  );
};

export default Title;
