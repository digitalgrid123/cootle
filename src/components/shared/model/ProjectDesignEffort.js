import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks"; // Assuming useAuth is still needed

const ProjectDesignEffort = ({
  designdropdownOpen,
  toggledesignDropdown,
  setSelectedDesignEfforts,
  selectedDesignEfforts,
  setDesign,
  design,
}) => {
  const dropdownRef = useRef(null);
  const { designEffort } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTabs, setSelectedTabs] = useState(selectedDesignEfforts); // State to manage selected tabs
  const [containerHeight, setContainerHeight] = useState(0);

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
  }, [designEffort]);

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
    if (selectedTabs.includes(id)) {
      setSelectedTabs(selectedTabs.filter((tabId) => tabId !== id));
    } else {
      setSelectedTabs([...selectedTabs, id]);
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

  useEffect(() => {
    setSelectedDesignEfforts(selectedTabs); // Pass selected design efforts to parent component
  }, [selectedTabs, setSelectedDesignEfforts]);

  return (
    <div>
      {designdropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content" ref={dropdownRef}>
            <div className="effort-container w-100">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h2 className="category-heading weight-600 mb-24">
                      Design efforts
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
                <div
                  className="col-lg-12 mt-20"
                  style={{
                    maxHeight: `${containerHeight}px`,
                    overflowY: "auto",
                  }}
                >
                  {filteredDesign.map((category, index) => (
                    <React.Fragment key={index}>
                      <h3 className="category-headingeffort mb-20 mt-24">
                        {category.category}
                        {selectedTabs.some((tabId) =>
                          category.items.some((item) => item.id === tabId)
                        ) && ": selected effort"}
                      </h3>
                      <div className="row border_bottom_faint pb-20">
                        {category.items.map((item, idx) => (
                          <div
                            key={`${index}-${idx}`}
                            className="col-lg-3 mb-3"
                          >
                            <li
                              className={`design-tab d-flex align-items-center justify-content-between gap-2 ${
                                selectedTabs.includes(item.id)
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
                                  src={`${
                                    selectedTabs.includes(item.id)
                                      ? "/assets/images/mark/remove-design.svg"
                                      : "/assets/images/mark/add-design.svg"
                                  }`}
                                  alt="add-btn"
                                />
                              </div>
                            </li>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDesignEffort;
