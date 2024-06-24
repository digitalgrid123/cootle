import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import ProjectDesignEffort from "@/components/shared/model/ProjectDesignEffort";

const Purpose = ({ isAdmin, onToggleNewPurpose, showNewPurposeInput }) => {
  const [data, setData] = useState(null);
  const { purposelist, user, reteriveEffort, mappingList } = useAuth();
  const params = useParams();
  const [lastIdNumber, setLastIdNumber] = useState(0);
  const [objectives, setObjectives] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeProductOutcome, setActiveProductOutcome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [designdropdownOpen, setDesigndropdownOpen] = useState(false); // Dropdown state for ProductOutcomesModel
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false); // Dropdown state for ProjectDesignEffort
  const [selectedProductOutcomes, setSelectedProductOutcomes] = useState([]);
  const [selectedDesignEfforts, setSelectedDesignEfforts] = useState([]);
  const [design, setDesign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (params?.id) {
        const result = await purposelist(params.id);
        if (result.status) {
          setData(result.data);
        }
      }
    };
    fetchData();
  }, [params.id, purposelist]);

  const fetchDesignEfforts = useCallback(
    async (designEffortIds) => {
      try {
        const response = await reteriveEffort(designEffortIds);
        if (response.status) {
          return response.data;
        } else {
          throw new Error("Failed to fetch design efforts");
        }
      } catch (error) {
        console.error("Error fetching design efforts:", error);
        return [];
      }
    },
    [reteriveEffort]
  );

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await mappingList("OUT");
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

          setObjectives(objectivesWithDesignEfforts);
          setActiveTab(objectivesWithDesignEfforts[0]);
          if (objectivesWithDesignEfforts[0]?.design_efforts.length > 0) {
            setActiveProductOutcome(
              objectivesWithDesignEfforts[0].design_efforts[0].title
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
    };
    fetchObjectives();
  }, [fetchDesignEfforts, mappingList]);

  const generateId = () => {
    const paddedNumber = (lastIdNumber + 1).toString().padStart(3, "0");
    return `#pur${paddedNumber}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleSavePurpose = () => {
    setLastIdNumber(lastIdNumber + 1);
    onToggleNewPurpose();
  };

  const toggledesigndropdown = (state) => {
    setDesigndropdownOpen(state);
  };

  const toggleDesignDropdown = (state) => {
    setDesignDropdownOpen(state);
  };

  return (
    <>
      <div className="wrapper-company">
        <div className="company-sidebar w-100">
          {isAdmin && (
            <div className="new-purpose-section w-100">
              {showNewPurposeInput && (
                <div className="new-purpose-create w-100">
                  <div className="mb-24 d-flex align-items-center justify-content-between w-100">
                    <h1 className="create-id">{generateId()}</h1>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <h2 className="create-name weight-500">Created by:</h2>
                        <div className="d-flex align-items-center gap-1">
                          <div className="create_profile">
                            <img
                              src={
                                user.profile_pic
                                  ? user.profile_pic
                                  : "/assets/images/mark/profile.png"
                              }
                              alt="profile"
                              style={{ position: "absolute", top: "0" }}
                            />
                          </div>
                          <h2 className="create-name">{user.fullname}</h2>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <h2 className="create-name weight-500">Created on:</h2>
                        <h2 className="create-name">{getCurrentDate()}</h2>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="close_effort_btn"
                        onClick={onToggleNewPurpose}
                      >
                        <span>Cancel</span>
                      </button>
                      <button
                        className="save_effort_btn"
                        onClick={handleSavePurpose}
                      >
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column pb-24 border-bottom-grey">
                    <input
                      className="title-input mb-24"
                      type="text"
                      name="title"
                      id="title"
                      placeholder="#Title"
                    />
                    <input
                      className="description-input"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="A brief about it"
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-4 ptb-34 border-bottom-grey">
                      <h1 className="select-outcome-text">
                        Desired outcome(s):
                      </h1>
                      <button
                        className="add-project_btn"
                        onClick={() => toggledesigndropdown(true)}
                      >
                        <span className="add-text">add</span>
                        <span>
                          <img
                            src="/assets/images/mark/addoutcomesbtn.svg"
                            alt="add-btn"
                          />
                        </span>
                      </button>
                    </div>
                    <div className="selected-design-efforts">
                      <h3>Selected product outcomes</h3>
                      <ul>
                        {selectedProductOutcomes.map((effortId) => (
                          <li key={effortId}>
                            <span className="dot"></span>
                            {
                              objectives
                                .flatMap((obj) => obj.design_efforts)
                                .find((effort) => effort.id === effortId)?.title
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-4 ptb-34 border-bottom-grey">
                    <h1 className="select-outcome-text">Design effort(s):</h1>
                    <button
                      className="add-project_btn"
                      onClick={() => toggleDesignDropdown(true)}
                    >
                      <span className="add-text">add</span>
                      <span>
                        <img
                          src="/assets/images/mark/addoutcomesbtn.svg"
                          alt="add-btn"
                        />
                      </span>
                    </button>
                  </div>
                  {selectedDesignEfforts.map((effortId) => (
                    <li key={effortId}>
                      <span className="dot"></span>
                      {
                        // Ensure design is defined and has the expected structure
                        design
                          .flatMap((obj) => obj.design_efforts)
                          .map((effort) => {
                            if (effort && effort.id === effortId) {
                              return (
                                <span key={effort.id}>{effort.title}</span>
                              );
                            }
                            return null;
                          })
                      }
                    </li>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ProductOutcomesModel
        designdropdownOpen={designdropdownOpen}
        toggledesignDropdown={toggledesigndropdown}
        objectives={objectives}
        selectedProductOutcomes={selectedProductOutcomes}
        setSelectedProductOutcomes={setSelectedProductOutcomes}
      />
      <ProjectDesignEffort
        designdropdownOpen={designDropdownOpen}
        toggledesignDropdown={toggleDesignDropdown}
        setSelectedDesignEfforts={setSelectedDesignEfforts}
        selectedDesignEfforts={selectedDesignEfforts}
        design={design}
        setDesign={setDesign}
      />
    </>
  );
};

export default Purpose;
