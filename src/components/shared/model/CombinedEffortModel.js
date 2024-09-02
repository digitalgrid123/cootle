import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks"; // Assuming useAuth is still needed
import LinkModel from "./LinkModel";
import { toggleBodyScroll } from "@/utils/scrollUtils";

const CombinedEffortModel = ({
  dropdownOpen,
  toggleDropdown,
  objectives,
  purpose,
  design,
  selectedProductOutcomes,
  setSelectedProductOutcomes,
  selectedPurpose,
  setSelectedPurpose,
  selectedDesignEfforts,
  setSelectedDesignEfforts,
  setDesign,
  tab,
  setLink,
  link,
  setLinks,
  links,
}) => {
  const dropdownRef = useRef(null);
  const { designEffort } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeTab, setActiveTab] = useState(tab);
  const [filteredResults, setFilteredResults] = useState([]);

  const addLink = (url) => {
    setLinks((prevLinks) => [...prevLinks, { url }]);
  };
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
    setActiveTab(tab);
  }, [tab]);

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
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (activeTab === "outcomes") {
      const results = objectives.filter((obj) =>
        obj.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(results);
    } else if (activeTab === "purpose") {
      const results = purpose.filter((obj) =>
        obj.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(results);
    } else if (activeTab === "effort") {
      const results = design
        .flatMap((category) => category.items)
        .filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      setFilteredResults(results);
    }
  };

  const handleAddClick = () => {
    if (filteredResults.length > 0) {
      const firstResult = filteredResults[0];
      if (activeTab === "outcomes") {
        handleTabClick(firstResult.id, "outcomes");
      } else if (activeTab === "purpose") {
        handleTabClick(firstResult.id, "purpose");
      } else if (activeTab === "effort") {
        handleTabClick(firstResult.id, "effort");
      }
      setSearchTerm("");
      setFilteredResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };
  const handleTabClick = (id, type) => {
    switch (type) {
      case "outcomes":
        setSelectedProductOutcomes((prev) => {
          const newSelection = prev?.includes(id)
            ? prev?.filter((objId) => objId !== id)
            : [...(prev || []), id];
          return newSelection;
        });
        break;
      case "purpose":
        setSelectedPurpose(id === selectedPurpose ? null : id);
        break;
      case "effort":
        setSelectedDesignEfforts((prev) => {
          const newSelection = prev?.includes(id)
            ? prev?.filter((objId) => objId !== id)
            : [...(prev || []), id];
          return newSelection;
        });
        break;
      default:
        break;
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderSelectedObjectives = () => {
    const selectedObjectives = objectives?.filter((obj) =>
      selectedProductOutcomes?.includes(obj.id)
    );

    return (
      <>
        {selectedObjectives.length > 0 && (
          <div className="selected-outcome border_bottom_soft-lavender mb-45">
            <h3 className="category-headingeffort mb-24 mt-24">
              Selected outcomes
            </h3>
            <ul className="p-0 m-0">
              <div className="grid-container">
                {selectedObjectives.map((objective) => (
                  <div key={objective.id} className="grid-item ">
                    <li
                      onClick={() => handleTabClick(objective.id, "outcomes")}
                      className="d-flex design-tab selected-tab align-items-center justify-content-between text-align-left mb-16"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div className="dot"></div>

                        {objective.title}
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
        )}
      </>
    );
  };

  const renderSampleObjectives = () => {
    const filteredObjectives = objectives.filter(
      (obj) =>
        obj.title.toLowerCase()?.includes(searchTerm.toLowerCase()) &&
        !selectedProductOutcomes?.includes(obj.id)
    );

    return (
      <div className="sample-outcome">
        <h3 className="category-headingeffort mb-24 mt-24">
          Sample desired product outcomes
        </h3>
        <ul className="p-0">
          <div className="grid-container">
            {filteredObjectives.map((objective) => (
              <div key={objective.id} className="grid-item ">
                <li
                  onClick={() => handleTabClick(objective.id, "outcomes")}
                  className="d-flex design-tab align-items-center justify-content-between flex-nowrap text-align-left mb-16"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="dot"></div>

                    {objective.title}
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
    );
  };

  const filteredPurpose = purpose?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPurposes = filteredPurpose?.filter(
    (item) => item.id === selectedPurpose
  );
  const nonSelectedPurposes = filteredPurpose?.filter(
    (item) => item.id !== selectedPurpose
  );

  const filteredDesign = design
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const renderSelectedEfforts = () => {
    if (selectedDesignEfforts?.length === 0) return null;

    const selectedEfforts = filteredDesign
      .flatMap((category) => category.items)
      .filter((item) => selectedDesignEfforts?.includes(item.id));

    return (
      <div className="selected-efforts border_bottom_soft-lavender mb-45">
        <h3 className="category-headingeffort mb-24 mt-24">Selected effort</h3>
        <ul className="p-0">
          <div className="grid-container">
            {selectedEfforts.map((effort) => (
              <div key={effort.id} className="grid-item ">
                <li
                  onClick={() => handleTabClick(effort.id, "effort")}
                  className="d-flex design-tab selected-tab align-items-center justify-content-between text-align-left"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="dot"></div>

                    {effort.title}
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
    );
  };

  const renderSampleEfforts = () => {
    return filteredDesign.map((category) => (
      <div key={category.category} className="sample-efforts">
        <h3 className="category-headingeffort mb-24 mt-24">
          {category.category}
        </h3>
        <ul className="p-0">
          <div className="grid-container">
            {category.items.map((effort) => (
              <div key={effort.id} className="grid-item ">
                <li
                  onClick={() => handleTabClick(effort.id, "effort")}
                  className="d-flex design-tab align-items-center justify-content-between flex-nowrap text-align-left mb-16"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="dot"></div>

                    {effort.title}
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
    ));
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
                        className={`tab-button  pr-12 ${
                          activeTab === "effort" ? "active-effort" : ""
                        }`}
                        onClick={() => setActiveTab("effort")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span className="add-text">Efforts</span>
                      </button>
                      <button
                        className={`tab-button pr-12 ${
                          activeTab === "outcomes" ? "active-outcomes" : ""
                        }`}
                        onClick={() => setActiveTab("outcomes")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span className="add-text">Outcomes</span>
                      </button>
                      <button
                        className={` tab-button pr-12 ${
                          activeTab === "purpose" ? "active-purpose" : ""
                        }`}
                        onClick={() => setActiveTab("purpose")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span className="add-text">Purpose</span>
                      </button>
                      <button
                        className={` tab-button pr-12 ${
                          activeTab === "links" ? "active-links" : ""
                        }`}
                        onClick={() => setActiveTab("links")}
                      >
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                        <span className="add-text">Links</span>
                      </button>
                    </div>
                    <div className="d-flex justify-content-end">
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
                  <div
                    className={`dropdown-header d-flex align-items-center justify-content-between pt-16 pb-16 ${
                      activeTab === "links" ? "" : "border_bottom_soft-lavender"
                    }`}
                  >
                    <div className="col-lg-6">
                      <div className="input-search-container">
                        <h2 className="category-heading weight-500">
                          {activeTab === "links"
                            ? "Links"
                            : activeTab === "purpose"
                            ? "Purposes"
                            : activeTab === "effort"
                            ? "Design Efforts"
                            : "Product Desired Outcomes"}
                        </h2>
                        {activeTab !== "links" && (
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
                                activeTab === "purpose"
                                  ? "Search or enter a purpose"
                                  : activeTab === "effort"
                                  ? "Search or enter a design effort"
                                  : "Search or enter a product desired outcomes"
                              }
                              className="dropdown-search"
                              aria-label={
                                activeTab === "purpose"
                                  ? "Search or enter a purpose"
                                  : activeTab === "effort"
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
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6"></div>
                  </div>
                </div>

                <div
                  className="tab-content project-list"
                  style={{
                    maxHeight: `${containerHeight}px`,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {activeTab === "outcomes" && (
                    <>
                      {renderSelectedObjectives()}
                      {renderSampleObjectives()}
                    </>
                  )}
                  {activeTab === "purpose" && (
                    <div
                      className="project-list"
                      style={{
                        maxHeight: `${containerHeight}px`,
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {selectedPurposes.length > 0 && (
                        <div className="selected-outcome border_bottom_soft-lavender mb-454">
                          <h3 className="category-headingeffort mb-24 mt-24">
                            Selected purposes
                          </h3>
                          <ul className="p-0">
                            <div className="grid-container">
                              {selectedPurposes.map((objective) => (
                                <div key={objective.id} className="grid-item ">
                                  <li
                                    onClick={() =>
                                      handleTabClick(objective.id, "purpose")
                                    }
                                    className="d-flex design-tab selected-tab align-items-center justify-content-between"
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="dot"></div>

                                      {objective.title}
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
                      )}

                      <div className="sample-outcome">
                        <h3 className="category-headingeffort mb-24 mt-24">
                          Sample purposes
                        </h3>
                        <ul className="p-0">
                          <div className="grid-container">
                            {nonSelectedPurposes.map((objective) => (
                              <div key={objective.id} className="grid-item ">
                                <li
                                  onClick={() =>
                                    handleTabClick(objective.id, "purpose")
                                  }
                                  className="d-flex design-tab align-items-center justify-content-between flex-nowrap text-align-left mb-16"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="dot"></div>

                                    {objective.title}
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
                  )}
                  {activeTab === "effort" && (
                    <div
                      className="project-list"
                      style={{
                        maxHeight: `${containerHeight}px`,
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {renderSelectedEfforts()}
                      {renderSampleEfforts()}
                    </div>
                  )}
                  {activeTab === "links" && (
                    <div className="col-lg-12">
                      <LinkModel
                        link={link}
                        links={links}
                        setLink={setLink}
                        setLinks={setLinks}
                        addLink={addLink}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CombinedEffortModel;
