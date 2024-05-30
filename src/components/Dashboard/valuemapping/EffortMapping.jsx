import React, { useState } from "react";

const tabs = [
  "User Research",
  "Usability",
  "Info Architecture",
  "Design Implementation",
  "Collaboration",
  "UI & Visual Design",
];

const EffortMapping = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="wrapper-company">
        <div className="company-sidebar h-100">
          <h1 className="company-setup-heading">Company setup</h1>
          <ul className="">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`d-flex align-items-center justify-content-start gap-2 ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <h2 className="menutext">{tab}</h2>
              </li>
            ))}
          </ul>
        </div>
        <div className="company-content h-100">
          <h1>{activeTab}</h1>
        </div>
      </div>
    </div>
  );
};

export default EffortMapping;
