import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks"; // Assuming useAuth is still needed

const PurposeList = ({
  purposedropdownOpen,
  togglePurposeDropdown,
  setSelectedPurpose,
  selectedPurpose,
  setPurpose,
  purpose,
}) => {
  const dropdownRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);

  const closeDropdown = () => {
    togglePurposeDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (purposedropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [purposedropdownOpen]);

  useEffect(() => {
    const calculateContainerHeight = () => {
      const windowHeight = window.innerHeight;
      const calculatedHeight = windowHeight - 385;
      setContainerHeight(calculatedHeight);
    };

    calculateContainerHeight();
    window.addEventListener("resize", calculateContainerHeight);

    return () => {
      window.removeEventListener("resize", calculateContainerHeight);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabClick = (id) => {
    // Update the selected purpose ID
    setSelectedPurpose(id === selectedPurpose ? null : id);
  };

  const filteredPurpose = purpose?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter selected and non-selected purposes
  const selectedPurposes = filteredPurpose?.filter(
    (item) => item.id === selectedPurpose
  );
  const nonSelectedPurposes = filteredPurpose?.filter(
    (item) => item.id !== selectedPurpose
  );

  return (
    <div>
      {purposedropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content" ref={dropdownRef}>
            <div className="effort-container w-100">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h2 className="category-heading weight-600 mb-24">
                      Purposes
                    </h2>
                    <button
                      className="send_btn"
                      onClick={closeDropdown}
                      aria-label="Close dropdown"
                    >
                      <span>close</span>
                    </button>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="search-container">
                    <div className="search-icon">
                      <img
                        src="/assets/images/mark/search.svg"
                        alt="search-icon"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Search or enter a purpose"
                      className="dropdown-search"
                      aria-label="Search or enter a purpose"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      className="plus-button"
                      aria-label="Add new purpose"
                    >
                      <span className="add-text weight-500">add</span>
                      <span>
                        <img src="/assets/images/mark/add.svg" alt="add-btn" />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="border_bottom_faint pb-32"></div>
                <div className="col-lg-12 mt-20">
                  {/* Selected Purposes */}
                  <div className="selected-purpose">
                    <h3 className="category-headingeffort mb-20 mt-24">
                      Selected purpose
                    </h3>
                    <ul className="p-0">
                      <div className="row border_bottom_faint pb-20">
                        {selectedPurposes.map((item) => (
                          <div key={item.id} className="col-lg-3 mb-3">
                            <li
                              className="design-tab d-flex align-items-center justify-content-between gap-2 selected-tab"
                              onClick={() => handleTabClick(item.id)}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <div className="dot"></div>
                                <div className="text-start effort-selection">
                                  {item.title}
                                </div>
                              </div>
                              <div>
                                <img
                                  src="/assets/images/mark/remove-design.svg"
                                  alt="remove-btn"
                                />
                              </div>
                            </li>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </div>
                  {/* Non-Selected Purposes */}
                  <div className="available-purpose mt-20">
                    <h3 className="category-headingeffort mb-20 mt-24">
                      Sample desired purpose outcomes
                    </h3>
                    <ul className="p-0">
                      <div className="row border_bottom_faint pb-20">
                        {nonSelectedPurposes.map((item) => (
                          <div key={item.id} className="col-lg-3 mb-3">
                            <li
                              className={`design-tab d-flex align-items-center justify-content-between gap-2 ${
                                item.id === selectedPurpose
                                  ? "selected-tab"
                                  : ""
                              }`}
                              onClick={() => handleTabClick(item.id)}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <div className="dot"></div>
                                <div className="text-start effort-selection">
                                  {item.title}
                                </div>
                              </div>
                              <div>
                                <img
                                  src="/assets/images/mark/add-design.svg"
                                  alt="add-btn"
                                />
                              </div>
                            </li>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurposeList;
