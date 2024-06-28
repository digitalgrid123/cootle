import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth, useToaster } from "@/hooks";

import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import NewPurposeSection from "./NewPurposeSection";
import EditPurposeSection from "./EditPurposeSection";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import ProjectDesignEffort from "@/components/shared/model/ProjectDesignEffort";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Generate weeks dynamically
const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);

const quarters = ["Q1", "Q2", "Q3", "Q4"];

const Purpose = ({ isAdmin, onToggleNewPurpose, showNewPurposeInput }) => {
  const { purposelist, user, reteriveEffort, mappingList, createPurpose } =
    useAuth();
  const params = useParams();
  const [lastIdNumber, setLastIdNumber] = useState(0);
  const [objectives, setObjectives] = useState([]);
  const [designdropdownOpen, setDesigndropdownOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [selectedProductOutcomes, setSelectedProductOutcomes] = useState([]);

  const [selectedDesignEfforts, setSelectedDesignEfforts] = useState([]);
  const [design, setDesign] = useState([]);
  const [newPurposeTitle, setNewPurposeTitle] = useState("");
  const [newPurposeDescription, setNewPurposeDescription] = useState("");
  const [purposeListData, setPurposeListData] = useState(null);

  const [purposeToEdit, setPurposeToEdit] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Quarterly");
  const [selectedOptionItem, setSelectedOptionItem] = useState(null);

  const { toaster } = useToaster();

  const fetchData = async () => {
    try {
      if (params?.id) {
        const result = await purposelist(params.id);
        if (result.status) {
          setPurposeListData(result.data);
        } else {
          throw new Error("Failed to fetch purpose list");
        }
      }
    } catch (error) {
      console.error("Error fetching purpose list:", error);
    }
  };

  useEffect(() => {
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
        } else {
          console.error("No data found in the response");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchObjectives();
  }, [fetchDesignEfforts, mappingList]);

  const generateId = () => {
    const highestLocalId = purposeListData
      ? purposeListData.reduce((maxId, purpose) => {
          return purpose.local_id > maxId ? purpose.local_id : maxId;
        }, 0)
      : 0;

    const nextId = highestLocalId + 1;
    const paddedNumber =
      nextId < 10 ? `00${nextId}` : nextId < 100 ? `0${nextId}` : `${nextId}`;
    return `#pur${paddedNumber}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleSavePurpose = async () => {
    try {
      const result = await createPurpose(
        newPurposeTitle,
        newPurposeDescription,
        params.id,
        selectedProductOutcomes,
        selectedDesignEfforts
      );

      if (result.status) {
        toaster("Purpose added successfully", TOAST_TYPES.SUCCESS);
        fetchData();
        setNewPurposeTitle("");
        setNewPurposeDescription("");
        setSelectedProductOutcomes([]);
        setSelectedDesignEfforts([]);
      } else {
        toaster("Failed to add purpose", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLastIdNumber(lastIdNumber + 1);
      onToggleNewPurpose();
    }
  };

  const handleEditClick = (purpose) => {
    setPurposeToEdit(purpose);
  };

  const handleCancelEdit = () => {
    setPurposeToEdit(null);
  };

  const toggledesigndropdown = (state) => {
    setDesigndropdownOpen(state);
  };

  const toggleDesignDropdown = (state) => {
    setDesignDropdownOpen(state);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  const isActive = (year, option) => {
    return selectedOptionItem === `${year}-${option}` ? "active" : "";
  };

  // Extract unique years from purposeListData's created_at dates
  const years = Array.from(
    new Set(
      purposeListData?.map((purpose) =>
        new Date(purpose.created_at).getFullYear()
      )
    )
  );

  const handleDateClick = (year, option) => {
    setSelectedOptionItem(`${year}-${option}`);
  };
  const renderDates = () => {
    return (
      <ul className="timeline-dates">
        {years.map((year) => (
          <React.Fragment key={year}>
            {selectedOption === "Monthly" &&
              months.map((month, index) => (
                <li
                  key={`${year}-${month}-${index}`}
                  className={`cursor-pointer ${isActive(year, month)} ${
                    index === months.length - 1 ? "last-item" : ""
                  }`}
                  onClick={() => handleDateClick(year, month)}
                >
                  <span>{month}</span>
                  <span>{year}</span>
                </li>
              ))}

            {selectedOption === "Weekly" &&
              weeks.map((week, index) => (
                <li
                  key={`${year}-${week}-${index}`}
                  className={`cursor-pointer ${isActive(year, week)} ${
                    index === weeks.length - 1 ? "last-item" : ""
                  }`}
                  onClick={() => handleDateClick(year, week)}
                >
                  <span className="week">{week}</span>
                  <span className="year">{year}</span>
                </li>
              ))}

            {selectedOption === "Quarterly" &&
              quarters.map((quarter, index) => (
                <li
                  key={`${year}-${quarter}-${index}`}
                  className={`cursor-pointer ${isActive(year, quarter)} ${
                    index === quarters.length - 1 ? "last-item" : ""
                  }`}
                  onClick={() => handleDateClick(year, quarter)}
                >
                  <span className="quarter">{quarter}</span>
                  <span className="year">{year}</span>
                </li>
              ))}

            {/* Render faint bottom border after each year */}
            <div className="border_bottom_faint w-100" key={`border-${year}`} />
          </React.Fragment>
        ))}
      </ul>
    );
  };
  // Function to calculate ISO week number
  function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }
  const filteredPurposes = purposeListData?.filter((purpose) => {
    if (!selectedOptionItem) {
      return true; // Show all if no option selected
    }
    const createdDate = new Date(purpose.created_at);
    const purposeYear = createdDate.getFullYear();
    const purposeMonth = months[createdDate.getMonth()];
    const purposeWeek = `Week ${getISOWeek(createdDate)}`;

    const purposeQuarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

    switch (selectedOption) {
      case "Monthly":
        return isActive(purposeYear, purposeMonth) !== "";
      case "Weekly":
        return isActive(purposeYear, purposeWeek) !== "";
      case "Quarterly":
        return isActive(purposeYear, purposeQuarter) !== "";
      default:
        return true; // Show all if no selection
    }
  });
  return (
    <div className="d-flex flex-row gap-3 h-100  justify-content-between">
      <div className="wrapper-company w-100">
        <div className="company-sidebar w-100 d-flex flex-column gap-4">
          <NewPurposeSection
            isAdmin={isAdmin}
            onToggleNewPurpose={onToggleNewPurpose}
            showNewPurposeInput={showNewPurposeInput}
            generateId={generateId}
            user={user}
            getCurrentDate={getCurrentDate}
            newPurposeTitle={newPurposeTitle}
            setNewPurposeTitle={setNewPurposeTitle}
            newPurposeDescription={newPurposeDescription}
            setNewPurposeDescription={setNewPurposeDescription}
            handleSavePurpose={handleSavePurpose}
            toggledesigndropdown={toggledesigndropdown}
            selectedProductOutcomes={selectedProductOutcomes}
            objectives={objectives}
            toggleDesignDropdown={toggleDesignDropdown}
            selectedDesignEfforts={selectedDesignEfforts}
            design={design}
          />
          {filteredPurposes && filteredPurposes.length > 0 ? (
            filteredPurposes.map((purpose) =>
              purposeToEdit && purposeToEdit.id === purpose.id ? (
                <EditPurposeSection
                  key={purpose.id}
                  purpose={purposeToEdit}
                  user={user}
                  handleCancel={handleCancelEdit}
                  objectives={objectives}
                  design={design}
                  setDesign={setDesign}
                  fetchData={fetchData}
                  setPurposeToEdit={setPurposeToEdit}
                />
              ) : (
                <div key={purpose.id} className="section-project">
                  <div className="pb-24 d-flex align-items-center justify-content-between w-100 border-bottom-grey">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="create-id">{`#pur${
                        purpose?.local_id < 10
                          ? `00${purpose?.local_id}`
                          : purpose?.local_id < 100
                          ? `0${purpose?.local_id}`
                          : purpose?.local_id
                      }`}</h1>
                      <h1 className="create-id">#{purpose?.title}</h1>
                    </div>
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
                              style={{
                                position: "absolute",
                                top: "0",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <h2 className="create-name">{user.fullname}</h2>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <h2 className="create-name weight-500">Created on:</h2>
                        <h2 className="create-name">
                          {new Date(purpose.created_at).toLocaleDateString()}
                        </h2>
                      </div>
                      {isAdmin && (
                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(purpose)}
                        >
                          <img src="/assets/images/mark/edit.svg" alt="" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4 pb-24 border-bottom-grey pt-24">
                    <h2 className="selectedone weight-500">Problem summary:</h2>
                    <p className="selectedone m-0">{purpose.description}</p>
                  </div>
                  <div className="d-flex align-items-center gap-4 pb-24 border-bottom-grey pt-24">
                    <h2 className="selectedone weight-500">
                      Desired outcomes:
                    </h2>
                    {purpose?.desired_outcomes.map((effortId) => {
                      const matchingObjective = objectives.find(
                        (obj) => obj.id === effortId
                      );
                      return (
                        <li key={effortId} className="p-0 selectedone">
                          <span className="dot black"></span>
                          {matchingObjective?.title}
                        </li>
                      );
                    })}
                  </div>
                  <div className="d-flex align-items-center gap-4 pb-24 pt-24">
                    <h2 className="selectedone weight-500">Design efforts:</h2>
                    {purpose.design_efforts.map((effortId) => (
                      <li key={effortId} className="p-0 selectedone">
                        <span className="dot black"></span>
                        {design
                          .flatMap((obj) => obj.items)
                          .map((effort) => {
                            if (effort && effort.id === effortId) {
                              return (
                                <span key={effort.id}>{effort.title}</span>
                              );
                            }
                            return null;
                          })}
                      </li>
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <div className="section-project">
              <div className="pb-24 d-flex align-items-center justify-content-between w-100 border-bottom-grey"></div>
            </div>
          )}
        </div>
      </div>
      <div className="wrapper-company">
        <div className="company-sidebar w-100 d-flex flex-column gap-4">
          <div className="filter-container">
            <div
              className="d-flex align-items-center gap-1 justify-content-center"
              onClick={toggleDropdown}
            >
              <h1 className="timeline-text">Timeline</h1>
              <img
                src="/assets/images/mark/dropdown-icon.svg"
                alt="dropdown-icon"
              />
            </div>
            {isDropdownOpen && (
              <ul className="timeline-dropdown">
                <li
                  onClick={() => handleOptionClick("Monthly")}
                  className={selectedOption === "Monthly" ? "active" : ""}
                >
                  Monthly
                </li>
                <li
                  onClick={() => handleOptionClick("Weekly")}
                  className={selectedOption === "Weekly" ? "active" : ""}
                >
                  Weekly
                </li>
                <li
                  onClick={() => handleOptionClick("Quarterly")}
                  className={selectedOption === "Quarterly" ? "active" : ""}
                >
                  Quarterly
                </li>
              </ul>
            )}
            {renderDates()}
          </div>
        </div>
      </div>
      <ProductOutcomesModel
        designdropdownOpen={designdropdownOpen}
        toggledesignDropdown={setDesigndropdownOpen}
        objectives={objectives}
        selectedProductOutcomes={selectedProductOutcomes}
        setSelectedProductOutcomes={setSelectedProductOutcomes}
      />
      <ProjectDesignEffort
        designdropdownOpen={designDropdownOpen}
        toggledesignDropdown={setDesignDropdownOpen}
        setSelectedDesignEfforts={setSelectedDesignEfforts}
        selectedDesignEfforts={selectedDesignEfforts}
        design={design}
        setDesign={setDesign}
      />
    </div>
  );
};

export default Purpose;
