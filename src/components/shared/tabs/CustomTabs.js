import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const CustomTabs = ({
  activeTab,
  onChangeTab,
  className = "mb-3",
  tabs = [],
  ...rest
}) => {
  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(key) => onChangeTab(key)}
      className={className}
      {...rest}
    >
      {tabs?.map((tab) => (
        <Tab eventKey={tab.value} title={tab.title} key={tab.value}>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
