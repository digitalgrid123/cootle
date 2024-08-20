import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/hooks"; // Assuming useAuth is still needed

const SingleProjectDeisngEffort = ({
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
  const [containerHeight, setContainerHeight] = useState(0);

  const closeDropdown = useCallback(() => {
    toggledesignDropdown(false);
  }, [toggledesignDropdown]);

  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    if (designdropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [designdropdownOpen, handleClickOutside]);

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
    // If the clicked item is already selected, deselect it
    if (selectedDesignEfforts?.includes(id)) {
      setSelectedDesignEfforts([]);
    } else {
      // Otherwise, select the clicked item and deselect others
      setSelectedDesignEfforts([id]);
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

  const renderSelectedEfforts = () => {
    if (selectedDesignEfforts?.length === 0) return null;

    return (
      <div className="selected-outcome border_bottom_faint pb-32">
        <h3 className="category-headingeffort mb-20 mt-24">Selected Effort</h3>
        <ul className="p-0">
          <div className="row">
            {selectedDesignEfforts?.map((id) => {
              const selectedItem = design
                .map((category) => category.items)
                .flat()
                .find((item) => item.id === id);

              if (!selectedItem) return null;

              return (
                <div key={id} className="col-lg-3">
                  <li
                    onClick={() => handleTabClick(id)}
                    className="d-flex design-tab selected-tab align-items-center justify-content-between mb-20"
                    aria-label={`Remove ${selectedItem.title}`}
                  >
                    {selectedItem.title}
                    <div>
                      <img
                        src="/assets/images/mark/remove-design.svg"
                        alt="remove-btn"
                      />
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  };

  const renderDesignEfforts = () => {
    return filteredDesign.map((category, index) => (
      <React.Fragment key={index}>
        <h3 className="category-headingeffort mb-20 mt-24">
          {category.category}
        </h3>
        <div className="row border_bottom_faint pb-20">
          {category.items.map((item, idx) => {
            const isSelected = selectedDesignEfforts?.includes(item.id);

            if (isSelected) {
              return null; // Skip rendering selected items in renderDesignEfforts
            }

            return (
              <div key={`${index}-${idx}`} className="col-lg-3 mb-3">
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
            );
          })}
        </div>
      </React.Fragment>
    ));
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
                      Design Efforts
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
                  className="col-lg-12 mt-20 project-list"
                  style={{
                    maxHeight: `${containerHeight}px`,
                    overflowY: "auto",
                  }}
                >
                  {renderSelectedEfforts()}
                  {renderDesignEfforts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProjectDeisngEffort;
