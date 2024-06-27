import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks"; // Adjust import path as per your project structure
import CreateModel from "@/components/shared/model/CreateModel";
import DesignEffortModel from "@/components/shared/model/DesignEffortModel";
import { useGlobalCompany } from "@/utils/globalState";
import { Loader } from "@/components/shared/loader";

const TABS = {
  DEFINITION: "Definition",
  PRODUCT_OUTCOMES: "Associated design efforts",
};

const ObjectiveMapping = ({ selectedMapping, reset, isAdmin }) => {
  const { mappingList, updatemapping, reteriveEffort } = useAuth();
  const [activeTab, setActiveTab] = useState(null);
  const [activeContentTab, setActiveContentTab] = useState(TABS.DEFINITION);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [objectives, setObjectives] = useState([]);
  const [activeProductOutcome, setActiveProductOutcome] = useState(null);
  const [designdropdownOpen, setDesignDropdownOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reteriveData, setRetrieveData] = useState([]);
  const selectedCompany = useGlobalCompany();

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );
  const toggledesignDropdown = useCallback(
    () => setDesignDropdownOpen((prev) => !prev),
    []
  );

  const handleTabClick = useCallback((obj) => {
    setActiveTab(obj);
    setActiveContentTab(TABS.DEFINITION);
    setEditMode(false);
    // Store activeTab's ID in localStorage to persist across page refresh
    localStorage.setItem("activeTabId", obj.id);
  }, []);

  const handleContentTabClick = useCallback((contentTab) => {
    setActiveContentTab(contentTab);
    setEditMode(false); // Ensure edit mode is off when switching tabs
  }, []);

  const handleProductOutcomeClick = useCallback((designEffort) => {
    setActiveProductOutcome(designEffort.title); // Set active design effort based on clicked item
  }, []);

  const fetchDesignEfforts = useCallback(async (designEffortIds) => {
    try {
      const response = await reteriveEffort(designEffortIds);
      if (response.status) {
        return response.data;
      } else {
        throw new Error("Failed to fetch design efforts");
      }
    } catch (error) {
      console.error("Error fetching design efforts:", error);
      setError("Error fetching design efforts");
      return [];
    }
  }, []);

  const fetchObjectives = useCallback(async () => {
    try {
      const res = await mappingList(selectedMapping);
      if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
        const objectivesData = res.data;

        // Fetch design efforts for each objective
        const designEffortPromises = objectivesData.map(async (obj) => {
          if (obj.design_efforts.length > 0) {
            const designEffortData = await fetchDesignEfforts(
              obj.design_efforts
            );
            return { ...obj, design_efforts: designEffortData };
          }
          return obj;
        });

        const objectivesWithDesignEfforts = await Promise.all(
          designEffortPromises
        );

        setObjectives(objectivesWithDesignEfforts);

        // Get active tab id from localStorage if available
        const storedActiveTabId = localStorage.getItem("activeTabId");
        // Set the active tab based on stored ID or default to the first objective
        const activeTabToSet =
          objectivesWithDesignEfforts.find(
            (obj) => obj.id === Number(storedActiveTabId)
          ) || objectivesWithDesignEfforts[0];
        setActiveTab(activeTabToSet);

        // Set the first design effort of the active tab as active
        if (activeTabToSet?.design_efforts.length > 0) {
          setActiveProductOutcome(activeTabToSet.design_efforts[0].title);
        }
      } else {
        setError("No data found in the response");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [
    mappingList,
    selectedMapping,
    fetchDesignEfforts,
    selectedCompany,
    reset,
  ]);

  const handleModelAdded = useCallback(async () => {
    await fetchObjectives();
  }, [fetchObjectives]);

  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  const handleEditButtonClick = useCallback(() => {
    setEditedTitle(activeTab.title);
    setEditedDescription(activeTab.description);
    setEditMode(true);
  }, [activeTab]);

  const handleCloseButtonClick = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleUpdate = useCallback(async () => {
    const previousObjectives = objectives;
    const updatedObjective = {
      ...activeTab,
      title: editedTitle,
      description: editedDescription,
    };

    // Optimistic UI update
    setObjectives((prevObjectives) =>
      prevObjectives.map((obj) =>
        obj.id === activeTab.id ? updatedObjective : obj
      )
    );
    setActiveTab(updatedObjective);

    try {
      const response = await updatemapping(
        activeTab.id,
        editedTitle,
        editedDescription,
        selectedMapping
      );

      if (!response?.status) {
        console.error("Failed to update mapping");
        // Revert to previous state if update fails
        setObjectives(previousObjectives);
        setActiveTab(activeTab);
      }
    } catch (error) {
      console.error("Error updating mapping:", error);
      // Revert to previous state if an error occurs
      setObjectives(previousObjectives);
      setActiveTab(activeTab);
    } finally {
      setEditMode(false);
    }
  }, [
    activeTab,
    editedTitle,
    editedDescription,
    selectedMapping,
    updatemapping,
    objectives,
  ]);

  const activeTabContent = useMemo(
    () => objectives.find((obj) => obj.id === activeTab?.id),
    [objectives, activeTab]
  );

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="wrapper-company">
        <div className="company-sidebar">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <h1 className="company-setup-heading weight-600">Objectives</h1>
            {isAdmin && (
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <img
                  src="/assets/images/mark/second-plus.svg"
                  alt="select-icon"
                />
              </div>
            )}
          </div>

          <ul>
            {objectives.map((obj) => (
              <li
                key={obj.id}
                className={`d-flex align-items-center justify-content-start gap-2 ${
                  activeTab?.id === obj.id ? "active" : ""
                }`}
                onClick={() => handleTabClick(obj)}
              >
                <h2 className="menutext f-16 weight-500">{obj.title}</h2>
              </li>
            ))}
          </ul>
        </div>

        <div className="sub-content">
          <h1 className="company-setup-heading weight-600 mb-20">
            {activeTab?.title}
          </h1>

          <div className="content-area w-100 d-flex gap-4 flex-column h-100">
            <div className="content-tabs">
              <button
                className={`content-tab weight-500 ${
                  activeContentTab === TABS.DEFINITION ? "active" : ""
                }`}
                onClick={() => handleContentTabClick(TABS.DEFINITION)}
              >
                Definition
              </button>
              <button
                className={`content-tab weight-500 ${
                  activeContentTab === TABS.PRODUCT_OUTCOMES ? "active" : ""
                }`}
                onClick={() => handleContentTabClick(TABS.PRODUCT_OUTCOMES)}
              >
                Associated design efforts
              </button>
            </div>

            <div className="d-flex align-items-start h-100 gap-3">
              {activeContentTab === TABS.DEFINITION ? (
                editMode ? (
                  <div className="d-flex flex-column w-100 content-defination-area">
                    <div className="d-flex align-item-center justify-content-between w-100">
                      <input
                        className="input-company mb-20 b-deepsea"
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />

                      <button
                        onClick={handleCloseButtonClick}
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
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={handleUpdate} className="send_btn">
                      <span>Update</span>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column w-100 content-defination-area">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <h1 className="defination-heading">{activeTab?.title}</h1>
                      {isAdmin && (
                        <button
                          onClick={handleEditButtonClick}
                          className="edit-button"
                        >
                          <img src="/assets/images/mark/edit.svg" alt="edit" />
                        </button>
                      )}
                    </div>
                    <div className="defination-text">
                      <ul className="defination-text">
                        {activeTab?.description
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
                )
              ) : (
                <>
                  <div className="product-outcome-tabs h-100 ">
                    <div className="d-flex align-items-center w-100 justify-content-between mb-20">
                      <h1 className="company-setup-heading weight-600">
                        Efforts
                      </h1>
                      {isAdmin && (
                        <div
                          className="cursor-pointer"
                          onClick={toggledesignDropdown}
                        >
                          <img
                            src="/assets/images/mark/second-plus.svg"
                            alt="select-icon"
                          />
                        </div>
                      )}
                    </div>

                    <ul className="p-0">
                      {activeTab.design_efforts.length > 0 ? (
                        activeTab.design_efforts.map((designEffort) => (
                          <li
                            key={designEffort.id}
                            className={`product-outcome-tab weight-500 d-flex align-items-center justify-content-start gap-2 ${
                              activeProductOutcome === designEffort.title
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleProductOutcomeClick(designEffort)
                            }
                          >
                            <h2 className="menutext f-16 weight-500">
                              {designEffort.title}
                            </h2>
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  {activeProductOutcome && (
                    <div className="d-flex flex-column w-100">
                      <div>
                        <h1 className="defination-heading">Defination</h1>
                      </div>
                      <div className="product-outcome-content content-defination-area w-100">
                        {activeTab.design_efforts
                          .filter(
                            (designEffort) =>
                              designEffort.title === activeProductOutcome
                          )
                          .map((designEffort) => (
                            <div key={designEffort.title}>
                              {designEffort.description
                                .split("\n")
                                .map((line, index) => {
                                  if (/^\d+\.(?!\s)/.test(line)) {
                                    line = line.replace(/^(\d+\.)\s*/, "$1 ");
                                  }
                                  return (
                                    <p key={index} className="defination-text">
                                      {line}
                                    </p>
                                  );
                                })}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <DesignEffortModel
        toggledesignDropdown={toggledesignDropdown}
        designdropdownOpen={designdropdownOpen}
        categoryId={activeTab?.id}
        DesignEffort={activeTab.design_efforts}
        type={selectedMapping}
        fetchObjectives={fetchObjectives}
      />
      <CreateModel
        title="Add objective mapping"
        selectedMapping={selectedMapping}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        onModelAdded={handleModelAdded}
      />
    </>
  );
};

export default ObjectiveMapping;
