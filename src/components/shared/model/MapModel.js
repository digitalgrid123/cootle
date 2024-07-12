import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useEffect, useState, useRef } from "react";

const MapModel = ({
  dropdownOpen,
  toggleDropdown,
  tabs,
  refreshCategories,
  refreshEffort,
}) => {
  const { createcategory, removeCategory } = useAuth(); // Assuming removeCategory is provided by useAuth
  const { toaster } = useToaster();

  const [category, setCategory] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen, toggleDropdown]);

  const handleAddCategory = async () => {
    if (category.trim() === "") {
      toaster("Category name cannot be empty", TOAST_TYPES.ERROR);
      return;
    }
    try {
      const res = await createcategory(category);
      if (!res.status) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        return;
      }
      toaster("Category created successfully", TOAST_TYPES.SUCCESS);
      refreshCategories(); // Refresh categories after adding a new one
      refreshEffort();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setCategory("");
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      // Assuming removeCategory accepts categoryId and returns a response
      const res = await removeCategory(categoryId);
      if (res.status) {
        toaster("Category removed successfully", TOAST_TYPES.SUCCESS);
        refreshCategories(); // Refresh categories after removal
      } else {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      console.error("Error removing category:", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div>
      {dropdownOpen && (
        <div className="invitation-overlay">
          <div
            ref={dropdownRef}
            className="invitation-content"
            style={{ flex: "0" }}
          >
            <div className="effort-container">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h2 className="category-heading weight-600 mb-24">
                  Update effort categories
                </h2>
              </div>
              <div className="border_bottom_faint pb-32">
                <div className="search-container border_bottom_faint ">
                  <div className="search-icon">
                    <img
                      src="/assets/images/mark/search.svg"
                      alt="search-icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search or enter an effort category"
                    className="dropdown-search"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <button className="plus-button" onClick={handleAddCategory}>
                    <span className="add-text weight-500">add</span>
                    <span>
                      <img src="/assets/images/mark/add.svg" alt="add-btn" />
                    </span>
                  </button>
                </div>
              </div>
              <div className="current_effortcategories">
                <h6 className="current_effort weight-600">
                  Current Effort categories
                </h6>
                <ul className="p-0 scrollbar-custom">
                  {tabs
                    .slice()
                    .reverse()
                    .map((tab) => (
                      <li
                        key={tab.category_id} // Assuming category_id is the unique identifier
                        className="d-flex align-items-center justify-content-between list-item mb-24"
                      >
                        <h2 className="menutext f-16 weight-500">{tab.name}</h2>
                        <button
                          className="remove_btn"
                          onClick={() => handleRemoveCategory(tab.id)}
                        >
                          <span>Remove</span>
                          <span>
                            <img
                              src="/assets/images/mark/remove.svg"
                              alt="remove-btn"
                            />
                          </span>
                        </button>
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
