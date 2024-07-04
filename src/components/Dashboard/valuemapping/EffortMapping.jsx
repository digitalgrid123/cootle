import React, { useEffect, useState, useCallback } from "react";
import EffortModel from "@/components/shared/model/EffortModel";
import MapModel from "@/components/shared/model/MapModel";
import { useAuth } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import { Loader } from "@/components/shared/loader";

const EffortMapping = ({ reset, isAdmin }) => {
  const { categories, getSinglecategory, updateDesignEffort } = useAuth();
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const [activeContentTab, setActiveContentTab] = useState("Definition");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [designdropdownOpen, setDesignDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialDesignEfforts, setInitialDesignEfforts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const selectedCompany = useGlobalCompany();
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [categories, selectedCompany, reset]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categories();
      if (res?.status && res.data.length > 0) {
        const firstCategory = res.data[0];
        setCategoriesList(res.data);
        setActiveCategory(firstCategory);
        const firstDesignEffort = firstCategory?.design_efforts[0] || null;
        setActiveSubTab(firstDesignEffort);
        setInitialDesignEfforts(firstCategory.design_efforts || []);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCategories = async () => {
    setLoading(true);
    try {
      const res = await categories();
      if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
        const updatedCategories = res.data;
        setCategoriesList(updatedCategories);
        setActiveCategory(updatedCategories[updatedCategories.length - 1]); // Set activeCategory to the last item
      } else {
        console.error("Failed to fetch categories or empty data returned");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshEfforts = async () => {
    setLoading(true);
    try {
      const res = await getSinglecategory(activeCategory.id); // Assuming getSinglecategory fetches the category details with efforts
      if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
        const updatedEfforts = res.data;
        setInitialDesignEfforts(updatedEfforts);
        setActiveSubTab(updatedEfforts[updatedEfforts.length - 1]); // Set activeSubTab to the last item
      } else {
        console.error("Failed to fetch efforts or empty data returned");
      }
    } catch (error) {
      console.error("Error fetching efforts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = useCallback(
    async (category) => {
      setLoading(true);
      try {
        const res = await getSinglecategory(category.id);
        setActiveCategory(category);
        if (res?.status && res.data.length > 0) {
          const firstSubTab = res.data[0];
          setActiveSubTab(firstSubTab);
          setInitialDesignEfforts(res.data);
          setActiveContentTab("Definition");
        } else {
          setActiveSubTab(null);
          setInitialDesignEfforts([]);
          console.error("Failed to fetch category details");
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      } finally {
        setLoading(false);
      }
    },
    [getSinglecategory]
  );

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    setActiveContentTab("Definition");
    setEditMode(false); // Exit edit mode if a new sub-tab is clicked
  };

  const handleContentTabClick = (contentTab) => {
    setActiveContentTab(contentTab);
    setEditMode(false); // Exit edit mode if the content tab is switched
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleDesignDropdown = () => {
    setDesignDropdownOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditTitle(activeSubTab.title);
    setEditDescription(activeSubTab.description);
  };

  const handleUpdateClick = async () => {
    try {
      const { id: effort_id } = activeSubTab; // Extracting effort_id from activeSubTab
      const updatedName = editTitle;
      const updatedDescription = editDescription;

      const res = await updateDesignEffort(
        updatedName,
        updatedDescription,
        effort_id
      );

      if (res.status) {
        // Update initialDesignEfforts without changing activeSubTab
        setInitialDesignEfforts((prevEfforts) =>
          prevEfforts.map((effort) =>
            effort.id === effort_id
              ? {
                  ...effort,
                  title: updatedName,
                  description: updatedDescription,
                }
              : effort
          )
        );

        // Update activeSubTab if it matches the updated effort_id
        setActiveSubTab((prevSubTab) =>
          prevSubTab && prevSubTab.id === effort_id
            ? {
                ...prevSubTab,
                title: updatedName,
                description: updatedDescription,
              }
            : prevSubTab
        );

        setEditMode(false); // Exit edit mode
      } else {
        console.error("Failed to update sub-tab");
      }
    } catch (error) {
      console.error("Error updating sub-tab:", error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <>
      <div className="wrapper-company">
        <div className="company-sidebar">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <h1 className="company-setup-heading weight-600">Categories</h1>
            {isAdmin && (
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <img
                  src="/assets/images/mark/second-plus.svg"
                  alt="select-icon"
                />
              </div>
            )}
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <ul>
              {categoriesList.map((category) => (
                <li
                  key={category.id}
                  className={`d-flex align-items-center justify-content-start gap-2 ${
                    activeCategory && activeCategory.id === category.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <h2 className="menutext f-16 weight-500">{category.name}</h2>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sub-content">
          <h1 className="company-setup-heading weight-600 mb-20">
            {activeCategory ? activeCategory.name : ""}
          </h1>
          <div className="d-flex gap-2" style={{ flex: "1 1 0" }}>
            <div className="sub_category">
              <div className="d-flex align-items-center w-100 justify-content-between mb-20">
                <h1 className="company-setup-heading weight-600">Efforts</h1>
                {isAdmin && (
                  <div
                    className="cursor-pointer"
                    onClick={toggleDesignDropdown}
                  >
                    <img
                      src="/assets/images/mark/second-plus.svg"
                      alt="select-icon"
                    />
                  </div>
                )}
              </div>
              <ul className="list-unstyled">
                {initialDesignEfforts.length > 0 ? (
                  initialDesignEfforts.map((subTab) => (
                    <li
                      key={subTab.id}
                      className={`${
                        activeSubTab && activeSubTab.id === subTab.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleSubTabClick(subTab)}
                    >
                      <h3 className="menutext f-16 weight-400">
                        {subTab.title}
                      </h3>
                    </li>
                  ))
                ) : (
                  <li> </li>
                )}
              </ul>
            </div>
            <div className="content-area w-100 d-flex gap-4 flex-column">
              <div className="content-tabs">
                <button
                  className={`content-tab weight-500 ${
                    activeContentTab === "Definition" ? "active" : ""
                  }`}
                  onClick={() => handleContentTabClick("Definition")}
                >
                  Definition
                </button>
              </div>
              <div className="content">
                {activeSubTab && activeContentTab === "Definition" && (
                  <>
                    {editMode ? (
                      <>
                        <div className="d-flex flex-column w-100 content-defination-area">
                          <div className="d-flex align-item-center justify-content-between w-100">
                            <input
                              className="input-company mb-20 b-deepsea"
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <button
                              onClick={handleCancelClick}
                              className="edit-button"
                            >
                              <img
                                src="/assets/images/mark/close_btn.png"
                                alt="edit"
                              />
                            </button>
                          </div>
                          <textarea
                            className="textarea-input h-300 b-deepsea mb-20"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                          />
                          <button
                            onClick={handleUpdateClick}
                            className="send_btn"
                          >
                            <span>Update</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex flex-column w-100 content-defination-area">
                          <div className="d-flex w-100 align-items-center justify-content-between">
                            <h1 className="defination-heading">
                              {activeSubTab.title}
                            </h1>
                            {isAdmin && (
                              <button
                                onClick={handleEditClick}
                                className="edit-button"
                              >
                                <img
                                  src="/assets/images/mark/edit.svg"
                                  alt="edit"
                                />
                              </button>
                            )}
                          </div>
                          <div className="defination-text">
                            <ul className="defination-text">
                              {activeSubTab.description
                                .split("\n")
                                .map((line, index) => {
                                  if (/^\d+\.(?!\s)/.test(line)) {
                                    line = line.replace(/^(\d+\.)\s*/, "$1 ");
                                  }
                                  return <li key={index}>{line}</li>;
                                })}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EffortModel
        toggledesignDropdown={toggleDesignDropdown}
        designdropdownOpen={designdropdownOpen}
        activeTab={activeCategory ? activeCategory.id : ""}
        refreshCategories={refreshEfforts}
      />
      <MapModel
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        tabs={categoriesList}
        activeTab={activeCategory ? activeCategory.name : ""}
        handleTabClick={handleCategoryClick}
        refreshCategories={refreshCategories}
      />
    </>
  );
};

export default EffortMapping;
