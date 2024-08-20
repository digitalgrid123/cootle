import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks";

const DesignEffortModel = ({
  designdropdownOpen,
  toggledesignDropdown,
  type,
  categoryId,
  fetchObjectives,
  DesignEffort,
}) => {
  const dropdownRef = useRef(null);
  const { designEffort, addEffortByMapping, removeEffortByMapping } = useAuth();
  const [design, setDesign] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTabs, setSelectedTabs] = useState([]);
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

          const initialSelectedTabs = DesignEffort.map((effort) => effort.id);
          setSelectedTabs(initialSelectedTabs);
        } else {
          console.error("Failed to fetch design effort:", res);
        }
      } catch (err) {
        console.error("Error fetching design effort:", err);
      }
    };

    fetchDesignEffort();
  }, [designEffort, DesignEffort]);

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

  const handleTabClick = async (id) => {
    try {
      const item = design
        .flatMap((category) => category.items)
        .find((item) => item.id === id);

      if (!item) {
        console.error(`Item with id ${id} not found.`);
        return;
      }

      if (selectedTabs.includes(id)) {
        await removeEffortByMapping(id, categoryId, type);
        setSelectedTabs(selectedTabs.filter((tabId) => tabId !== id));
        fetchObjectives();
      } else {
        await addEffortByMapping(id, categoryId, type);
        setSelectedTabs([...selectedTabs, id]);
        fetchObjectives();
      }
    } catch (error) {
      console.error("Error performing API operation:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFirstUnselected = async () => {
    const firstUnselected = design
      .flatMap((category) => category.items)
      .find(
        (item) =>
          !selectedTabs.includes(item.id) &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (firstUnselected) {
      await handleTabClick(firstUnselected.id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFirstUnselected();
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

  // Separate selected and unselected items
  const selectedItems = design
    .flatMap((category) => category.items)
    .filter((item) => selectedTabs.includes(item.id));

  const unselectedItems = design
    .flatMap((category) => category.items)
    .filter(
      (item) =>
        !selectedTabs.includes(item.id) &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Extract unique categories for unselected items
  const unselectedCategories = [
    ...new Set(unselectedItems.map((item) => item.category)),
  ].map((category) => ({
    category,
    items: unselectedItems.filter((item) => item.category === category),
  }));

  useEffect(() => {
    if (designdropdownOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [designdropdownOpen]);

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
                <div className="grid-container">
                  <div className="search-container four-columns">
                    <div className="search-icon">
                      <img
                        src="/assets/images/mark/search.svg"
                        alt="search-icon"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Search or enter a product desired outcome"
                      className="dropdown-search"
                      aria-label="Search or enter a product desired outcome"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="plus-button"
                      aria-label="Add first unselected item"
                      onClick={handleAddFirstUnselected}
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
                  {/* Render selected items */}
                  {selectedItems.length > 0 && (
                    <>
                      <h3 className="category-headingeffort mb-20 mt-24 ">
                        Selected Efforts
                      </h3>
                      <div className=" grid-container border_bottom_faint pb-20">
                        {selectedItems.map((item, idx) => (
                          <div key={idx} className="grid-item ">
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
                    </>
                  )}

                  {unselectedCategories.map((category, index) => (
                    <React.Fragment key={index}>
                      <h3 className="category-headingeffort mb-20 mt-24 ">
                        {category.category}
                      </h3>
                      <div className="grid-container border_bottom_faint pb-20">
                        {category.items.map((item, idx) => (
                          <div key={`${index}-${idx}`} className="grid-item ">
                            <li
                              className="design-tab d-flex align-items-center justify-content-between gap-2"
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

export default DesignEffortModel;
