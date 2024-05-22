import React from "react";
import { Tab } from "react-bootstrap";

const CustomTab = ({ title, content, value, ...rest }) => {
  return (
    <Tab eventKey={value} title={title} key={value} {...rest}>
      {content}
    </Tab>
  );
};

export default CustomTab;
