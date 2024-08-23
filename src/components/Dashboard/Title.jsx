import React from "react";

const Title = ({ title }) => {
  // Check if the title should not be truncated
  const shouldTruncate = !(title === "Value mapping");

  // Truncate the title if it should be truncated and is longer than 22 characters
  const truncatedTitle =
    shouldTruncate && title.length > 22
      ? `${title.substring(0, 22)}...`
      : title;

  return (
    <h1
      className={`page-title-heading weight-500 ${
        shouldTruncate ? "text-nowrap" : ""
      }`}
      title={title}
    >
      {truncatedTitle}
    </h1>
  );
};

export default Title;
