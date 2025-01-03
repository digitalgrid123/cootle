import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks";
import { toggleBodyScroll } from "@/utils/scrollUtils";

const CombinedPurposeDropdown = ({
  dropdownOpen,
  toggleDropdown,
  selectedDesignEfforts,
  setSelectedDesignEfforts,
  selectedProductOutcomes,
  setSelectedProductOutcomes,
  design,
  objectives,
  setDesign,
  tab,
}) => {
  const dropdownRef = useRef(null);
  const { designEffort } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeTab, setActiveTab] = useState(tab);

  const closeDropdown = useCallback(() => {
    toggleDropdown(false);
  }, [toggleDropdown]);

  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, handleClickOutside]);

  useEffect(() => {
    const fetchDesignEffort = async () => {
      try {
        const res = await designEffort();

        if (res?.status) {
          const groupedDesign = res.data.reduce((acc, curr) => {
            const existingCategory = acc.find(
              (item) => item.category === curr.category
            );

            if (existingCategory) {
              existingCategory.items.push(curr);
            } else {
              acc.push({
                category: curr.category,
                items: [curr],
              });
            }

            return acc;
          }, []);

          setDesign(groupedDesign);
        } else {
          console.error("Failed to fetch design effort:", res);
        }
      } catch (err) {
        console.error("Error fetching design effort:", err);
      }
    };

    fetchDesignEffort();
  }, [designEffort, setDesign]);

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
    if (activeTab === "design") {
      const isSelected = selectedDesignEfforts.includes(id);
      if (isSelected) {
        setSelectedDesignEfforts((prev) => prev.filter((item) => item !== id));
      } else {
        setSelectedDesignEfforts((prev) => [...prev, id]);
      }
    } else if (activeTab === "outcomes") {
      const isSelected = selectedProductOutcomes.includes(id);
      if (isSelected) {
        setSelectedProductOutcomes((prev) =>
          prev.filter((item) => item !== id)
        );
      } else {
        setSelectedProductOutcomes((prev) => [...prev, id]);
      }
    }
  };

  const filteredDesign = design
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const filteredObjectives = objectives
    .filter((obj) => obj.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((obj) =>
      activeTab === "design"
        ? !selectedDesignEfforts.includes(obj.id)
        : !selectedProductOutcomes.includes(obj.id)
    );

  const renderSelectedEfforts = () => {
    const selectedItems =
      activeTab === "design"
        ? design
            .flatMap((category) => category.items)
            .filter((item) => selectedDesignEfforts.includes(item.id))
        : objectives.filter((obj) => selectedProductOutcomes.includes(obj.id));

    return selectedItems.length > 0 ? (
      <div className="selected-outcomen border_bottom_soft-lavender pb-32">
        <h3 className="category-headingeffort mb-20 mt-24">
          {activeTab === "design" ? "Selected Effort" : "Selected Outcomes"}
        </h3>
        <ul className="p-0">
          <div className="grid-container">
            {selectedItems.map((item) => (
              <div key={item.id} className="grid-item ">
                <li
                  onClick={() => handleTabClick(item.id)}
                  className="d-flex design-tab selected-tab align-items-center justify-content-between text-align-left mb-3"
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
    ) : null;
  };

  const renderDesignEfforts = () => {
    return filteredDesign.map((category, index) => (
      <React.Fragment key={index}>
        <h3 className="category-headingeffort mb-20 mt-24">
          {category.category}
        </h3>
        <div className="grid-container border_bottom_soft-lavender pb-20">
          {category.items
            .filter((item) => !selectedDesignEfforts.includes(item.id))
            .map((item, idx) => (
              <div key={`${index}-${idx}`} className="grid-item">
                <li
                  className="design-tab d-flex align-items-center justify-content-between gap-2"
                  onClick={() => handleTabClick(item.id)}
                  aria-label={`Toggle ${item.title}`}
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
                      alt="toggle-btn"
                    />
                  </div>
                </li>
              </div>
            ))}
        </div>
      </React.Fragment>
    ));
  };

  const renderObjectives = () => {
    return (
      <div className="grid-container">
        {filteredObjectives.map((objective) => (
          <div key={objective.id} className="grid-item ">
            <li
              className="design-tab d-flex align-items-center justify-content-between gap-2"
              onClick={() => handleTabClick(objective.id)}
              aria-label={`Toggle ${objective.title}`}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="dot"></div>

                <div className="text-start effort-selection">
                  {objective.title}
                </div>
              </div>

              <div>
                <img
                  src="/assets/images/mark/add-design.svg"
                  alt="toggle-btn"
                />
              </div>
            </li>
          </div>
        ))}
      </div>
    );
  };
  const handleAddClick = () => {
    if (filteredDesign.length > 0 && filteredDesign[0].items.length > 0) {
      const firstResult = filteredDesign[0].items.find(
        (item) => !selectedDesignEfforts.includes(item.id)
      );
      if (firstResult) {
        handleTabClick(firstResult.id);
        setSearchTerm("");
      }
    } else if (filteredObjectives.length > 0) {
      const firstResult = filteredObjectives.find(
        (obj) => !selectedProductOutcomes.includes(obj.id)
      );
      if (firstResult) {
        handleTabClick(firstResult.id);
        setSearchTerm("");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };
  useEffect(() => {
    toggleBodyScroll(dropdownOpen);
  }, [dropdownOpen]);

  return (
    <>
      {dropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content" ref={dropdownRef}>
            <div className="effort-container w-100">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex align-items-center pb-16 border_bottom_soft-lavender justify-content-between">
                    <div className="d-flex align-items-center gap-4 ">
                      <button
                        className={`tab-button ${
                          activeTab === "outcomes" ? "active-outcomes" : ""
                        }`}
                        onClick={() => setActiveTab("outcomes")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span className="add-text">Desired outcome(s)</span>
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === "design" ? "active-design" : ""
                        }`}
                        onClick={() => setActiveTab("design")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span>Design Effort(s)</span>
                      </button>
                    </div>

                    <div className="d-flex justify-content-end w-100">
                      <button
                        className="close-button"
                        onClick={closeDropdown}
                        aria-label="Close dropdown"
                      >
                        <span>Close</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="dropdown-header d-flex align-items-center justify-content-between pt-16 pb-16 border_bottom_soft-lavender ">
                    <div className="col-lg-6">
                      <div className="input-search-container">
                        <h2 className="category-heading weight-500 ">
                          {activeTab === "design"
                            ? "Design Efforts"
                            : "Product Desired Outcomes"}
                        </h2>

                        <div className="search-container w-100">
                          <div className="search-icon">
                            <img
                              src="/assets/images/mark/search.svg"
                              alt="search-icon"
                            />
                          </div>
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyPress}
                            placeholder={
                              activeTab === "design"
                                ? "Search or enter a design effort"
                                : "Search or enter a product desired outcomes"
                            }
                            className="dropdown-search"
                            aria-label={
                              activeTab === "design"
                                ? "Search or enter a design effort"
                                : "Search or enter a product desired outcomes"
                            }
                          />
                          <button
                            type="button"
                            onClick={handleAddClick}
                            className="plus-button"
                            aria-label="Add new category"
                          >
                            <span className="add-text weight-500">add</span>
                            <span>
                              <img
                                src="/assets/images/mark/add.svg"
                                alt="add-btn"
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6"></div>
                  </div>
                </div>
                <div
                  className="project-list"
                  style={{
                    maxHeight: `${containerHeight}px`,
                    overflowY: "auto",
                  }}
                >
                  <div className="col-lg-12">{renderSelectedEfforts()}</div>
                  <div className="col-lg-12 mt-4">
                    {activeTab === "design"
                      ? renderDesignEfforts()
                      : renderObjectives()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CombinedPurposeDropdown;
