import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth, useToaster } from "@/hooks";

import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import NewEffortSection from "./NewEffortSection";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import ProjectDesignEffort from "@/components/shared/model/ProjectDesignEffort";
import SingleProductOutcomesModel from "@/components/shared/model/SingleProductOutcomesModel";
import SingleProjectDesignEffort from "@/components/shared/model/SingleProjectDeisngEffort";
import PurposeList from "@/components/shared/model/PurposeList";
import EditEffortSection from "./EditEffortSection";

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

const Effort = ({ isAdmin, onToggleNewEffort, showNewEffortInput }) => {
  const {
    purposelist,
    user,
    reteriveEffort,
    mappingList,
    createProjecteffort,
    effortList,
  } = useAuth();
  const params = useParams();
  const [lastIdNumber, setLastIdNumber] = useState(0);
  const [objectives, setObjectives] = useState([]);

  const [designdropdownOpen, setDesigndropdownOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [selectedProductOutcomes, setSelectedProductOutcomes] = useState([]);
  const [selectedDesignEfforts, setSelectedDesignEfforts] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [design, setDesign] = useState([]);

  const [purposeListData, setPurposeListData] = useState(null);

  const [effortToEdit, setEffortToEdit] = useState(null);
  const [purposedropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [effortsListData, setEffortsListData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Quarterly");

  const [selectedOptionItem, setSelectedOptionItem] = useState(null);

  const [link, setLink] = useState("");

  const [links, setLinks] = useState([]);

  const togglePurposeDropdown = (state) => {
    setPurposeDropdownOpen(state);
  };

  const { toaster } = useToaster();

  const fetchEffortData = async () => {
    try {
      if (params?.id) {
        const result = await effortList(params.id);
        if (result.status) {
          setEffortsListData(result.data);
        } else {
          throw new Error("Failed to fetch purpose list");
        }
      }
    } catch (error) {
      console.error("Error fetching purpose list:", error);
    }
  };

  useEffect(() => {
    fetchEffortData();
  }, [params.id, effortList]);

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
    return `#eff${paddedNumber}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleSaveEffort = async () => {
    try {
      // Transforming links array to match the desired structure
      const transformedLinks = links.map((linkObj) => ({ link: linkObj.url }));

      // Assuming createProjecteffort expects an array of URLs
      const result = await createProjecteffort(
        params.id,
        transformedLinks,
        selectedPurpose,
        selectedProductOutcomes[0],
        selectedDesignEfforts[0]
      );

      if (result.status) {
        toaster("effort added successfully", TOAST_TYPES.SUCCESS);
        fetchEffortData();
        setSelectedPurpose(null);
        setSelectedProductOutcomes(null);
        setSelectedDesignEfforts(null);
      } else {
        toaster("Failed to add effort", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLastIdNumber(lastIdNumber + 1);
      onToggleNewEffort();
    }
  };

  const handleEditClick = (effort) => {
    setEffortToEdit(effort);
  };

  const handleCancelEdit = () => {
    setEffortToEdit(null);
  };

  const toggledesigndropdown = (state) => {
    setDesigndropdownOpen(state);
  };

  const toggleDesignDropdown = (state) => {
    setDesignDropdownOpen(state);
  };
  const statusDescriptions = {
    YBC: "Yet to be checked",
    UCH: "Unchecked",
    UPA: "Unplanned Activity",
    REA: "Realised",
    VUR: "Value Unrealised",
  };
  const getStatusStyles = (status) => {
    switch (status) {
      case "YBC":
        return {
          backgroundColor: "#000000CC",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
        };
      case "UCH":
        return {
          backgroundColor: "#F24E1E",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
        };
      case "UPA":
        return {
          backgroundColor: "#E0DFE3",
          color: "black",
          padding: "12px 16px",
          borderRadius: "8px",
        };
      case "REA":
        return {
          backgroundColor: "#0ACF83",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
        };
      case "VUR":
        return {
          backgroundColor: "#F58E07",
          color: "white",
          padding: "12px 16px",
          borderRadius: "8px",
        };
      default:
        return {};
    }
  };
  const getStatusImage = () => {
    return "/assets/images/mark/checkeddown.svg"; // Replace with your common image path
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

  useEffect(() => {
    // Clear selectedOptionItem when selectedOption changes
    setSelectedOptionItem(null);
  }, [selectedOption]);
  // Function to calculate ISO week number
  function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }
  const filteredEffort = effortsListData?.filter((purpose) => {
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
    <>
      <div className="d-flex flex-row gap-3 h-100  justify-content-between">
        <div className="wrapper-company w-100">
          <div className="company-sidebar w-100 d-flex flex-column gap-4 ">
            <div className="row">
              <NewEffortSection
                isAdmin={isAdmin}
                onToggleNewEffort={onToggleNewEffort}
                showNewEffortInput={showNewEffortInput}
                generateId={generateId}
                user={user}
                getCurrentDate={getCurrentDate}
                handleSaveEffort={handleSaveEffort}
                toggledesigndropdown={toggledesigndropdown}
                selectedProductOutcomes={selectedProductOutcomes}
                objectives={objectives}
                toggleDesignDropdown={toggleDesignDropdown}
                selectedDesignEfforts={selectedDesignEfforts}
                togglePurposeDropdown={togglePurposeDropdown}
                selectedPurpose={selectedPurpose}
                purpose={purposeListData}
                design={design}
                link={link}
                setLink={setLink}
                links={links}
                setLinks={setLinks}
              />

              {filteredEffort &&
                filteredEffort.map((effort) =>
                  effortToEdit && effortToEdit.id === effort.id ? (
                    <>
                      {
                        <EditEffortSection
                          purposeListData={purposeListData}
                          setPurposeListData={setPurposeListData}
                          link={link}
                          setLink={setLink}
                          links={links}
                          setLinks={setLinks}
                          key={effort.id}
                          effort={effort}
                          user={user}
                          handleCancel={handleCancelEdit}
                          objectives={objectives}
                          design={design}
                          setDesign={setDesign}
                          setPurposeToEdit={setEffortToEdit}
                          fetchEffortData={fetchEffortData}
                        />
                      }
                    </>
                  ) : (
                    <div key={effort.id} className="col-lg-6">
                      <div className="section-project">
                        <div className="pb-24 d-flex align-items-center justify-content-between w-100 border-bottom-grey">
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <h1 className="create-id">{`#eff${
                              effort?.local_id < 10
                                ? `00${effort?.local_id}`
                                : effort?.local_id < 100
                                ? `0${effort?.local_id}`
                                : effort?.local_id
                            }`}</h1>

                            <div className="d-flex align-items-center gap-1">
                              <div className="d-flex align-items-center gap-2">
                                <h2 className="create-name weight-500">
                                  Created on:
                                </h2>
                                <h2 className="create-name">
                                  {new Date(
                                    effort.created_at
                                  ).toLocaleDateString()}
                                </h2>
                              </div>
                              {isAdmin && (
                                <button
                                  className="edit-button"
                                  onClick={() => handleEditClick(effort)}
                                >
                                  <img
                                    src="/assets/images/mark/edit.svg"
                                    alt=""
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="pb-24 d-flex gap-2  justify-content-between flex-column w-100 border-bottom-grey pt-24">
                          <div className="d-flex align-items-center gap-4">
                            <h2 className="create-name weight-500">By:</h2>
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
                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">Type:</h1>
                            {effort.design_effort && (
                              <li
                                key={effort.design_effort}
                                className="p-0 selectedone"
                              >
                                <span className="dot black"></span>
                                {design
                                  .flatMap((category) => category.items)
                                  .find(
                                    (obj) => obj.id === effort.design_effort
                                  )?.title || ""}
                              </li>
                            )}
                          </div>
                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">Outcome:</h1>
                            {effort.outcome && (
                              <li
                                key={effort.outcome}
                                className="p-0 selectedone"
                              >
                                <span className="dot black"></span>
                                {objectives.find(
                                  (obj) => obj.id === effort.outcome
                                )?.title || ""}
                              </li>
                            )}
                          </div>
                        </div>
                        <div className="pb-24 d-flex gap-2  justify-content-between flex-column w-100 border-bottom-grey pt-24 pb-32">
                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">Purpose:</h1>
                            {effort.purpose && (
                              <li
                                key={effort.purpose}
                                className="p-0 selectedone"
                              >
                                <span className="dot black"></span>
                                {purposeListData?.find(
                                  (obj) => obj.id === effort.purpose
                                )?.title || ""}
                              </li>
                            )}
                          </div>

                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">
                              Value status:
                            </h1>
                            <div
                              className="d-flex align-items-center gap-1"
                              style={getStatusStyles(effort?.value_status)}
                            >
                              <span className="checked-status">
                                {statusDescriptions[effort?.value_status]}
                              </span>
                              <span>
                                {getStatusImage() && (
                                  <img
                                    src={getStatusImage()}
                                    alt={
                                      statusDescriptions[effort?.value_status]
                                    }
                                  />
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">Checked By:</h1>
                            <div className="no-checked"></div>
                          </div>
                        </div>

                        <div className="pb-24 d-flex gap-2  justify-content-between flex-column w-100 border-bottom-grey pt-24 pb-32">
                          <div className="d-flex align-items-center gap-4">
                            <h1 className="select-outcome-text">Links:</h1>
                            {effort.links && effort.links.length > 0 ? (
                              effort.links.map((linkObj, index) => (
                                <li
                                  key={linkObj.id}
                                  className="p-0 selectedone"
                                >
                                  <a
                                    href={linkObj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "underline" }}
                                    className="selectedone"
                                  >
                                    {`Link ${index + 1}`}
                                  </a>
                                </li>
                              ))
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
        <div className="wrapper-company">
          <div className="company-sidebar w-100 d-flex flex-column gap-4">
            <div className="filter-container">
              <div
                className="d-flex align-items-center gap-1 justify-content-center cursor-pointer"
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
      </div>
      <SingleProductOutcomesModel
        designdropdownOpen={designdropdownOpen}
        toggledesignDropdown={setDesigndropdownOpen}
        objectives={objectives}
        selectedProductOutcomes={selectedProductOutcomes}
        setSelectedProductOutcomes={setSelectedProductOutcomes}
      />
      <SingleProjectDesignEffort
        designdropdownOpen={designDropdownOpen}
        toggledesignDropdown={setDesignDropdownOpen}
        setSelectedDesignEfforts={setSelectedDesignEfforts}
        selectedDesignEfforts={selectedDesignEfforts}
        design={design}
        setDesign={setDesign}
      />
      <PurposeList
        purposedropdownOpen={purposedropdownOpen}
        togglePurposeDropdown={togglePurposeDropdown}
        setSelectedPurpose={setSelectedPurpose}
        selectedPurpose={selectedPurpose}
        setPurpose={setPurposeListData}
        purpose={purposeListData}
      />
    </>
  );
};

export default Effort;
