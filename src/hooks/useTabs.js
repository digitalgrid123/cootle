"use client";

import { useState } from "react";

const useTabs = (defaultValues) => {
  const [currentTab, setCurrentTab] = useState(defaultValues || "");

  return {
    currentTab,
    onChangeTab: (event) => setCurrentTab(event),
    setCurrentTab,
  };
};

export default useTabs;
