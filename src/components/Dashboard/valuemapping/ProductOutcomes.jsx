import dynamic from 'next/dynamic';
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks"; // Adjust import path as per your project structure
import CreateModel from "@/components/shared/model/CreateModel";
import DesignEffortModel from "@/components/shared/model/DesignEffortModel";
import { useGlobalCompany } from "@/utils/globalState";
import { Loader } from "@/components/shared/loader";
import ArchievedModel from "@/components/shared/model/ArchievedModel";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "../../../../public/assets/css/quill.css";

const TABS = {
  DEFINITION: "Definition",
  PRODUCT_OUTCOMES: "Associated design efforts",
};

const ProductOutcomes = ({
  selectedMapping,
  reset,
  isAdmin,
  togglearchievedDropdown,
  archieveddropdownOpen,
}) => {
  const { mappingList, updatemapping, reteriveEffort, mappingachieve } =
    useAuth();
  const [activeTab, setActiveTab] = useState(null);
  const [activeContentTab, setActiveContentTab] = useState(
    TABS.PRODUCT_OUTCOMES
  );
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
  const [archivedObjectives, setArchivedObjectives] = useState([]);

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
    localStorage.setItem("activeTabId", obj.id); // Store active tab id in localStorage
    setActiveContentTab(TABS.DEFINITION);
    setEditMode(false);
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

        // Collect all design effort IDs into a single array
        const allDesignEffortIds = [];
        objectivesData.forEach((obj) => {
          if (obj.design_efforts.length > 0) {
            allDesignEffortIds.push(...obj.design_efforts);
          }
        });

        // Fetch all design efforts at once
        const allDesignEffortData = await fetchDesignEfforts(
          allDesignEffortIds
        );

        // Map design efforts back to their respective objectives
        const objectivesWithDesignEfforts = objectivesData.map((obj) => {
          if (obj.design_efforts.length > 0) {
            const designEffortData = obj.design_efforts.map((id) =>
              allDesignEffortData.find((effort) => effort.id === id)
            );
            return { ...obj, design_efforts: designEffortData };
          }
          return obj;
        });

        // Separate archived and non-archived objectives
        const archivedObjectives = objectivesWithDesignEfforts.filter(
          (obj) => obj.is_archived
        );
        const nonArchivedObjectives = objectivesWithDesignEfforts.filter(
          (obj) => !obj.is_archived
        );

        // Reverse the list of non-archived objectives
        const reversedNonArchivedObjectives = nonArchivedObjectives.reverse();

        setObjectives(reversedNonArchivedObjectives);
        setArchivedObjectives(archivedObjectives);

        // Retrieve active tab index from localStorage if available
        const storedActiveTabId = localStorage.getItem("activeTabId");
        if (storedActiveTabId) {
          const storedTab = reversedNonArchivedObjectives.find(
            (obj) => obj.id === parseInt(storedActiveTabId)
          );
          setActiveTab(storedTab || reversedNonArchivedObjectives[0]);
        } else {
          setActiveTab(reversedNonArchivedObjectives[0]);
        }

        // Set the first design effort of the active tab as active
        if (reversedNonArchivedObjectives[0]?.design_efforts.length > 0) {
          setActiveProductOutcome(
            reversedNonArchivedObjectives[0].design_efforts[0].title
          );
        }
      } else {
        setError("No data found in the response");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [mappingList, selectedMapping, fetchDesignEfforts, reset]);

  const fetchlastObjectives = useCallback(async () => {
    try {
      const res = await mappingList(selectedMapping);
      if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
        const objectivesData = res.data;

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

        const archivedObjectives = objectivesWithDesignEfforts.filter(
          (obj) => obj.is_archived
        );
        const unarchivedObjectives = objectivesWithDesignEfforts.filter(
          (obj) => !obj.is_archived
        );

        // Reverse the lists
        const reversedUnarchivedObjectives = unarchivedObjectives.reverse();
        const reversedArchivedObjectives = archivedObjectives.reverse();

        setObjectives(reversedUnarchivedObjectives);
        setArchivedObjectives(reversedArchivedObjectives);

        // Set the active tab to the last unarchived objective
        setActiveTab(reversedUnarchivedObjectives[0]);

        // Set the first design effort of the active tab as active
        if (reversedUnarchivedObjectives[0]?.design_efforts.length > 0) {
          setActiveProductOutcome(
            reversedUnarchivedObjectives[0].design_efforts[0].title
          );
        }
      } else {
        setError("No data found in the response");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [mappingList, selectedMapping, fetchDesignEfforts, reset]);

  const handleModelAddedlast = useCallback(async () => {
    await fetchlastObjectives();
  }, [fetchlastObjectives]);

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
  const handleMappingAchieve = useCallback(
    async (mappingId) => {
      try {
        const res = await mappingachieve(mappingId);

        if (res.status) {
          fetchObjectives();
        } else {
          // Handle failure, show error message or take appropriate action
          console.error("Failed to achieve mapping:", res.message);
        }
      } catch (error) {
        console.error("Error achieving mapping:", error);
      }
    },
    [mappingachieve]
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
            <h1 className="mapping-category-heading padding-left-20 ">
              Outcomes
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

          <ul>
            {objectives.map((obj) => (
              <li
                key={obj.id}
                className={`custom-li-class d-flex align-items-center justify-content-between gap-2 ${
                  activeTab?.id === obj.id
                    ? "active active-tab "
                    : " inactive-tab"
                }`}
                onClick={() => handleTabClick(obj)}
              >
                <h2 className="menutext f-16 weight-400">{obj.title}</h2>
                {isAdmin && activeTab?.id === obj.id ? (
                  <button
                    className="archived-btn menutext f-16 weight-500"
                    onClick={() => handleMappingAchieve(obj.id)}
                  >
                    <img
                      src="/assets/images/mark/archieve.png"
                      alt="archived"
                    />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="sub-content">
          <h1 className="company-setup-heading weight-500 pb-16 pl-28">
            {activeTab?.title}
          </h1>

          <div className="content-area w-100 d-flex gap-3 flex-column h-100">
            <div className="content-tabs">
              <button
                className={`content-tab weight-500 ${
                  activeContentTab === TABS.PRODUCT_OUTCOMES ? "active" : ""
                }`}
                onClick={() => handleContentTabClick(TABS.PRODUCT_OUTCOMES)}
              >
                Associated design efforts
              </button>
              <button
                className={`content-tab weight-500 ${
                  activeContentTab === TABS.DEFINITION ? "active" : ""
                }`}
                onClick={() => handleContentTabClick(TABS.DEFINITION)}
              >
                Definition
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
                    <div>
                      <ReactQuill
                        className="textarea-input  b-deepsea mb-20"
                        value={editedDescription}
                        onChange={(value) => setEditedDescription(value)}
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
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    /> */}
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
                        dangerouslySetInnerHTML={{
                          __html: activeTab?.description,
                        }}
                      />
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div className="product-outcome-tabs h-100 ">
                    <div className="d-flex align-items-center w-100 justify-content-between mb-20">
                      <h1 className="company-setup-heading weight-500 pl-14">
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
                                ? "active active-tab"
                                : "inactive-tab"
                            }`}
                            onClick={() =>
                              handleProductOutcomeClick(designEffort)
                            }
                          >
                            <h2 className="menutext f-16 weight-400">
                              {designEffort.title}
                            </h2>
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  <div className="d-flex flex-column w-100">
                    <div className="content-tabs padding-lr-30 mb-16">
                      <div className="content-tab weight-500 active padding-10-18">
                        <h1 className="defination-heading">Defination</h1>
                      </div>
                    </div>
                    {activeProductOutcome && (
                      <div className="product-outcome-content content-defination-area w-100">
                        {activeTab.design_efforts
                          .filter(
                            (designEffort) =>
                              designEffort.title === activeProductOutcome
                          )
                          .map((designEffort) => (
                            <div key={designEffort.title}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: designEffort.description,
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
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
        title="Add product mapping"
        selectedMapping={selectedMapping}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        onModelAdded={handleModelAddedlast}
      />
      <ArchievedModel
        title="Archieved List"
        selectedMapping={selectedMapping}
        dropdownOpen={archieveddropdownOpen}
        toggleDropdown={togglearchievedDropdown}
        archivedObjectives={archivedObjectives}
        fetchObjectives={fetchObjectives}
      />
    </>
  );
};

export default ProductOutcomes;
