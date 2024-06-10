import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useEffect, useState } from "react";

const MapModel = ({ dropdownOpen, toggleDropdown, tabs, activeTab }) => {
  return (
    <div>
      {dropdownOpen && (
        <div className="invitation-overlay">
          <div className="invitation-content " style={{ flex: "0" }}>
            <div className="effort-container">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h2 className="category-heading weight-600 mb-24">
                  Update effort categories
                </h2>
                {/* <button onClick={toggleDropdown}>Close</button> */}
              </div>
              <div className="search-container ">
                <div className="search-icon">
                  <img src="/assets/images/mark/search.svg" alt="search-icon" />
                </div>
                <input
                  type="text"
                  placeholder="Search or enter an effort category"
                  className="dropdown-search"
                />
                <button className="plus-button">
                  <span className="add-text weight-500">add</span>
                  <span>
                    <img src="/assets/images/mark/add.svg" alt="add-btn" />
                  </span>
                </button>
              </div>
              <div className="current_effortcategories">
                <h6 className="current_effort weight-600">
                  Current Effort categories
                </h6>
                <ul className="p-0">
                  {tabs.map((tab) => (
                    <li key={tab.name} className="effort-text">
                      <h2 className="menutext f-16 weight-500">{tab.name}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapModel;
