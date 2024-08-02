// SidebarComponent.js
import React, { useState, useRef, useCallback } from "react";

const SidebarTimelineComponent = ({
  isLifetimeClicked,
  isDropdownOpen,
  selectedOption,
  toggleDropdown,
  handleOptionClick,
  renderDates,
}) => {
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside of it
  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          toggleDropdown();
        }
      }
    },
    [isDropdownOpen, toggleDropdown]
  );

  // Attach event listener
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="wrapper-company h-100">
      <div className="company-sidebar w-100 d-flex flex-column gap-4 h-100">
        <div className="filter-container">
          <div className="d-flex align-items-center flex-column border_bottom_soft-lavender  pb-24">
            <div
              className="d-flex align-items-center gap-1 justify-content-center cursor-pointer mb-24"
              onClick={toggleDropdown}
            >
              <h1 className="timeline-text">Timeline</h1>
              <img
                src="/assets/images/mark/dropdown-icon.svg"
                alt="dropdown-icon"
              />
            </div>
            <div
              onClick={() => handleOptionClick("Lifetime")}
              className={`cursor-pointer lifetime ${
                isLifetimeClicked ? "active" : ""
              }`}
            >
              <h1 className="timeline-text">Lifetime</h1>
            </div>
            {isDropdownOpen && (
              <ul className="timeline-dropdown" ref={dropdownRef}>
                <li
                  onClick={() => handleOptionClick("Monthly")}
                  className={selectedOption === "Monthly" ? "active" : ""}
                >
                  Monthly
                </li>
                <li
                  onClick={() => handleOptionClick("Weekly")}
                  className={selectedOption === "Weekly" ? "active" : ""}
                >
                  Weekly
                </li>
                <li
                  onClick={() => handleOptionClick("Quarterly")}
                  className={selectedOption === "Quarterly" ? "active" : ""}
                >
                  Quarterly
                </li>
              </ul>
            )}
          </div>
          {renderDates()}
        </div>
      </div>
    </div>
  );
};

export default SidebarTimelineComponent;
