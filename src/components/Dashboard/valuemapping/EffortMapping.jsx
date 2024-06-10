import InvitationModel from "@/components/shared/model/InvitationModel";
import MapModel from "@/components/shared/model/MapModel";
import React, { useState } from "react";

const tabs = [
  { name: "User Research", subTabs: ["Interviews", "Surveys", "User Testing"] },
  { name: "Usability", subTabs: ["Heuristic Evaluation", "Usability Testing"] },
  { name: "Info Architecture", subTabs: ["Sitemaps", "Wireframes"] },
  { name: "Design Implementation", subTabs: ["Prototypes", "Design Systems"] },
  { name: "Collaboration", subTabs: ["Workshops", "Feedback Sessions"] },
  { name: "UI & Visual Design", subTabs: ["Mockups", "Style Guides"] },
];

const EffortMapping = () => {
  // State to manage active tab, sub-tab, content tab, and dropdown visibility
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [activeSubTab, setActiveSubTab] = useState(tabs[0].subTabs[0]);
  const [activeContentTab, setActiveContentTab] = useState("Definition");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handlers for tab, sub-tab, and content tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    setActiveSubTab(tab.subTabs[0]);
    setActiveContentTab("Definition");
  };

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    setActiveContentTab("Definition");
  };

  const handleContentTabClick = (contentTab) => {
    setActiveContentTab(contentTab);
  };

  // Function to get data of the active tab
  const getActiveTabData = () => {
    return tabs.find((tab) => tab.name === activeTab);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="wrapper-company">
        {/* Sidebar for main tabs */}
        <div className="company-sidebar ">
          <div
            className="d-flex align-items-center w-100 justify-content-between"
            onClick={toggleDropdown}
          >
            <h1 className="company-setup-heading weight-600">Company setup</h1>
            <div className="cursor-pointer">
              <img
                src="/assets/images/mark/second-plus.svg"
                alt="select-icon"
              />
            </div>
          </div>

          {dropdownOpen && <div className="invitation-content"></div>}

          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`d-flex align-items-center justify-content-start gap-2 ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                <h2 className="menutext f-16 weight-500">{tab.name}</h2>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content area */}
        <div className="sub-content ">
          <h1 className="company-setup-heading weight-600 mb-20">
            {activeTab}
          </h1>
          <div className="d-flex gap-2 " style={{ flex: "1 1 0" }}>
            <div className="sub_category">
              <div className="d-flex align-items-center w-100 justify-content-between mb-20">
                <h1 className="company-setup-heading weight-600">Efforts</h1>
                <div className="cursor-pointer">
                  <img
                    src="/assets/images/mark/second-plus.svg"
                    alt="select-icon"
                  />
                </div>
              </div>
              <ul className="list-unstyled">
                {getActiveTabData().subTabs.map((subTab) => (
                  <li
                    key={subTab}
                    className={` ${activeSubTab === subTab ? "active" : ""}`}
                    onClick={() => handleSubTabClick(subTab)}
                  >
                    <h3 className="menutext f-16 weight-400">{subTab}</h3>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content area */}
            <div className="content-area w-100 d-flex gap-4 flex-column">
              <div className="content-tabs">
                <button
                  className={`content-tab weight-500 ${
                    activeContentTab === "Definition" ? "active" : ""
                  }`}
                  onClick={() => handleContentTabClick("Definition")}
                >
                  Definition
                </button>
                <button
                  className={`content-tab weight-500 ${
                    activeContentTab === "Product Outcomes" ? "active" : ""
                  }`}
                  onClick={() => handleContentTabClick("Product Outcomes")}
                >
                  Product Outcomes
                </button>
              </div>
              <div className="content">
                {activeContentTab === "Definition" ? (
                  <p>Content for {activeSubTab} - Definition</p>
                ) : (
                  <p>Content for {activeSubTab} - Product Outcomes</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapModel
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        tabs={tabs}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    </>
  );
};

export default EffortMapping;
