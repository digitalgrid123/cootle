import React, { useEffect, useRef, useState } from "react";

const SingleProductOutcomesModel = ({
  designdropdownOpen,
  toggledesignDropdown,
  objectives,
  selectedProductOutcomes,
  setSelectedProductOutcomes,
}) => {
  const dropdownRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const closeDropdown = () => {
    toggledesignDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (designdropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [designdropdownOpen]);

  useEffect(() => {
    function calculateContainerHeight() {
      const windowHeight = window.innerHeight;
      const calculatedHeight = windowHeight - 385;
      setContainerHeight(calculatedHeight);
    }

    calculateContainerHeight();
    window.addEventListener("resize", calculateContainerHeight);

    return () => {
      window.removeEventListener("resize", calculateContainerHeight);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (id) => {
    if (!selectedProductOutcomes) {
      setSelectedProductOutcomes([id]);
    } else if (selectedProductOutcomes.includes(id)) {
      setSelectedProductOutcomes(
        selectedProductOutcomes.filter((objId) => objId !== id)
      );
    } else {
      setSelectedProductOutcomes([...selectedProductOutcomes, id]);
    }
  };

  const renderSelectedObjectives = () => {
    const selectedObjectives = objectives.filter((obj) =>
      selectedProductOutcomes?.includes(obj.id)
    );

    return (
      <div className="selected-outcome border_bottom_faint pb-32">
        <h3 className="category-headingeffort mb-20 mt-24">
          Selected outcomes
        </h3>
        <ul className="p-0">
          <div className="row">
            {selectedObjectives.map((objective) => (
              <div key={objective.id} className="col-lg-3">
                <li
                  onClick={() => handleTabClick(objective.id)}
                  className="d-flex design-tab selected-tab  align-items-center justify-content-between"
                >
                  {objective.title}
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
    );
  };

  const renderSampleObjectives = () => {
    const filteredObjectives = objectives.filter(
      (obj) =>
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedProductOutcomes?.includes(obj.id)
    );

    return (
      <div className="sample-outcome">
        <h3 className="category-headingeffort mb-20 mt-24">
          Sample desired product outcomes
        </h3>
        <ul className="p-0">
          <div className="row">
            {filteredObjectives.map((objective) => (
              <div key={objective.id} className="col-lg-3">
                <li
                  onClick={() => handleTabClick(objective.id)}
                  className="d-flex design-tab  align-items-center justify-content-between flex-wrap"
                >
                  {objective.title}
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
    );
  };

  return (
    <>
      {designdropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content" ref={dropdownRef}>
            <div className="effort-container w-100">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h2 className="category-heading weight-600 mb-24">
                      Product desired outcomes
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
                      placeholder="Search or enter a product desired outcomes"
                      className="dropdown-search"
                      aria-label="Search or enter a product desired outcomes"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      className="plus-button"
                      aria-label="Add new category"
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
                  {renderSelectedObjectives()}
                  {renderSampleObjectives()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductOutcomesModel;
