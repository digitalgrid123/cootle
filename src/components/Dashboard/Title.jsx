import React from "react";

const Title = ({ title }) => {
  // Truncate the title if it's longer than 15 characters
  const truncatedTitle =
    title.length > 15 ? `${title.substring(0, 15)}...` : title;

  return (
    <>
      <h1 className="page-title-heading weight-500 truncate" title={title}>
        {truncatedTitle}
      </h1>
    </>
  );
};

export default Title;
