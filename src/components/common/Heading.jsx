import React from "react";
import PropTypes from "prop-types";

const Heading = ({ className, text, level }) => {
  const HeadingTag = `h${level}`;

  return <HeadingTag className={className}>{text}</HeadingTag>;
};

Heading.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  level: PropTypes.number,
};

Heading.defaultProps = {
  className: "",
  level: 1,
};

export default Heading;
