import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import EffortModel from "@/components/shared/model/EffortModel";
import MapModel from "@/components/shared/model/MapModel";
import { useAuth } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import ArchivedEffortsModal from "@/components/shared/model/ArchivedEffortsModal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "../../../../public/assets/css/quill.css";

const EffortMapping = ({
  reset,
  isAdmin,
  archieveddropdownOpen,
  togglearchievedDropdown,
}) => {
  const { categories, getSinglecategory, updateDesignEffort, effortachieve } =
    useAuth();
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
  const [editDescription, setEditDescription] = useState("");
  const [archivedDesignEfforts, setArchivedDesignEfforts] = useState([]);

  const selectedCompany = useGlobalCompany();

  useEffect(() => {
    fetchCategories();
  }, [reset]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categories();
      if (res?.status && res.data.length > 0) {
        const firstCategory = res.data[0];
        setCategoriesList(res.data);
        setActiveCategory(firstCategory);
        setActiveSubTab(
          firstCategory.design_efforts.filter((de) => !de.is_archived)[0] ||
            null
        );
        setInitialDesignEfforts(
          firstCategory.design_efforts.filter((de) => !de.is_archived)
        );
        setArchivedDesignEfforts(
          firstCategory.design_efforts.filter((de) => de.is_archived)
        );
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
        setCategoriesList(res.data);
        setActiveCategory(res.data[res.data.length - 1]); // Set activeCategory to the last item
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
      const res = await getSinglecategory(activeCategory.id);
      if (res?.status) {
        const unarchivedDesignEfforts = res.data.filter(
          (de) => !de.is_archived
        );
        const archivedDesignEfforts = res.data.filter((de) => de.is_archived);
        setInitialDesignEfforts(unarchivedDesignEfforts);
        setArchivedDesignEfforts(archivedDesignEfforts);
        setActiveSubTab(
          unarchivedDesignEfforts[unarchivedDesignEfforts.length - 1] || null
        );
      } else {
        console.error("Failed to fetch efforts or empty data returned");
        setInitialDesignEfforts([]);
        setArchivedDesignEfforts([]);
        setActiveSubTab(null);
      }
    } catch (error) {
      console.error("Error fetching efforts:", error);
      setInitialDesignEfforts([]);
      setArchivedDesignEfforts([]);
      setActiveSubTab(null);
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
          const unarchivedDesignEfforts = res.data.filter(
            (de) => !de.is_archived
          );
          const archivedDesignEfforts = res.data.filter((de) => de.is_archived);
          setInitialDesignEfforts(unarchivedDesignEfforts);
          setArchivedDesignEfforts(archivedDesignEfforts);
          setActiveSubTab(unarchivedDesignEfforts[0] || null);
          setActiveContentTab("Definition");
        } else {
          setActiveSubTab(null);
          setInitialDesignEfforts([]);
          setArchivedDesignEfforts([]);
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

  const handleSubTabClick = useCallback((subTab) => {
    setActiveSubTab(subTab);
    setActiveContentTab("Definition");
    setEditMode(false);
  }, []);

  const handleContentTabClick = useCallback((contentTab) => {
    setActiveContentTab(contentTab);
    setEditMode(false);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleDesignDropdown = () => setDesignDropdownOpen((prev) => !prev);

  const handleEditClick = () => {
    setEditMode(true);
    setEditTitle(activeSubTab.title);
    setEditDescription(activeSubTab.description);
  };

  const handleUpdateClick = async () => {
    try {
      const { id: effort_id } = activeSubTab;
      const res = await updateDesignEffort(
        editTitle,
        editDescription,
        effort_id
      );
      if (res.status) {
        setInitialDesignEfforts((prevEfforts) =>
          prevEfforts.map((effort) =>
            effort.id === effort_id
              ? { ...effort, title: editTitle, description: editDescription }
              : effort
          )
        );
        setActiveSubTab((prevSubTab) =>
          prevSubTab && prevSubTab.id === effort_id
            ? { ...prevSubTab, title: editTitle, description: editDescription }
            : prevSubTab
        );
        setEditMode(false);
      } else {
        console.error("Failed to update sub-tab");
      }
    } catch (error) {
      console.error("Error updating sub-tab:", error);
    }
  };

  const handleCancelClick = () => setEditMode(false);

  const handleEffortAchieve = useCallback(
    async (effortId) => {
      try {
        const res = await effortachieve(effortId);
        if (res.status) {
          refreshEfforts();
        } else {
          console.error("Failed to achieve mapping:", res.message);
        }
      } catch (error) {
        console.error("Error achieving mapping:", error);
      }
    },
    [effortachieve, refreshEfforts]
  );

  const SkeletonLoader = useMemo(
    () => (
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="skeleton-item"></li>
        ))}
      </ul>
    ),
    []
  );

  const renderedCategoriesList = useMemo(
    () => (
      <ul>
        {categoriesList.map((category) => (
          <li
            key={category.id}
            className={`d-flex align-items-center justify-content-start gap-2 ${
              activeCategory && activeCategory.id === category.id
                ? "active active-tab "
                : "inactive-tab"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="menutext f-16 weight-400">{category.name}</h2>
          </li>
        ))}
      </ul>
    ),
    [categoriesList, activeCategory, handleCategoryClick]
  );

  return (
    <>
      <div className="wrapper-company">
        <div className="company-sidebar ">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <h1 className="mapping-category-heading padding-left-20 ">
              Categories
            </h1>
            {isAdmin && (
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <img
                  src="/assets/images/mark/second-plus.svg"
                  alt="select-icon"
                />
              </div>
            )}
          </div>
          {loading ? SkeletonLoader : renderedCategoriesList}
        </div>
        <div className="sub-content">
          <h1 className="main-setup-heading weight-500 pb-16 pl-28">
            {activeCategory ? activeCategory.name : ""}
          </h1>
          <div className="d-flex gap-3" style={{ flex: "1 1 0" }}>
            <div className="sub_category">
              <div className="d-flex align-items-center w-100 justify-content-between mb-20">
                <h1 className="mapping-category-heading pl-14 ">Efforts</h1>
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
                      className={`custom-li-class d-flex align-items-center justify-content-between ${
                        activeSubTab && activeSubTab.id === subTab.id
                          ? "active active-tab "
                          : "inactive-tab "
                      }`}
                      onClick={() => handleSubTabClick(subTab)}
                    >
                      <h2 className="menutext f-16 weight-400">
                        {subTab.title}
                      </h2>

                      {isAdmin &&
                      activeSubTab &&
                      activeSubTab.id === subTab.id ? (
                        <button
                          className="archived-btn menutext f-16 weight-400"
                          onClick={() => handleEffortAchieve(subTab.id)}
                        >
                          <img
                            src="/assets/images/mark/archieve.png"
                            alt="archived"
                          />
                        </button>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li> </li>
                )}
              </ul>
            </div>
            <div className="content-area w-100 d-flex gap-3 flex-column">
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
              <div className="content" style={{ flex: "1 1" }}>
                {activeSubTab && activeContentTab === "Definition" && (
                  <>
                    {editMode ? (
                      <>
                        <div className="d-flex flex-column w-100 content-defination-area h-100">
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
                          <div>
                            <ReactQuill
                              className="textarea-input  b-deepsea mb-20"
                              value={editDescription}
                              onChange={(value) => setEditDescription(value)}
                              modules={{
                                toolbar: [
                                  [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                  ],
                                  ["bold", "italic", "underline"],

                                  ["link"],
                                  ["clean"],
                                ],
                              }}
                            />
                          </div>

                          {/* <textarea
                            className="textarea-input h-300 b-deepsea mb-20"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                          /> */}
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
                                  className="edit-image"
                                />
                              </button>
                            )}
                          </div>
                          <div className="defination-text">
                            <div
                              className="description-editable"
                              dangerouslySetInnerHTML={{
                                __html: activeSubTab.description,
                              }}
                            />
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
        refreshEfforts={refreshEfforts}
        fetchCategories={fetchCategories}
      />
      <MapModel
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        tabs={categoriesList}
        activeTab={activeCategory ? activeCategory.name : ""}
        handleTabClick={handleCategoryClick}
        refreshCategories={refreshCategories}
        refreshEffort={refreshEfforts}
      />
      <ArchivedEffortsModal
        title="Archived Design Efforts"
        dropdownOpen={archieveddropdownOpen}
        toggleDropdown={togglearchievedDropdown}
        archivedDesignEfforts={archivedDesignEfforts}
        refreshEfforts={refreshEfforts}
      />
    </>
  );
};

export default EffortMapping;
