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
import DropdownCheckedlist from "./Dropdown/DropdownCheckedlist";

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
    userinfo,
    reteriveEffort,
    mappingList,
    createProjecteffort,
    effortList,
    memberslist,
    userinfobyId,
    useradd,
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

  const [membersListData, setMembersListData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("Quarterly");
  const [selectedOptionItem, setSelectedOptionItem] = useState(null);
  const [userdetail, setUserDetail] = useState([]);

  const [isLifetimeClicked, setIsLifetimeClicked] = useState(false);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();
      if (res && res.status) {
        setUser(res.data);
      }
    };

    fetchUserinfo();
  }, [userinfo]);
  // Handle lifetime click
  const handleLifetimeClick = () => {
    setIsLifetimeClicked(true);
    setSelectedOption("Quarterly"); // Set a default option if needed
    setSelectedOptionItem(null); // Reset selected item
    setIsDropdownOpen(false); // Close dropdown if open
  };

  const [link, setLink] = useState("");

  const [links, setLinks] = useState([]);

  const togglePurposeDropdown = (state) => {
    setPurposeDropdownOpen(state);
  };

  useEffect(() => {
    const fetchUserinfo = async (userId) => {
      try {
        const res = await userinfobyId(userId);
        if (res && res.status && res.data) {
          setUserDetail(res.data); // Assuming res.data contains user details
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (effortsListData && effortsListData.length > 0) {
      effortsListData.forEach((effort) => fetchUserinfo(effort.user));
    }
  }, [effortsListData, useradd]);

  const { toaster } = useToaster();
  const fetchMemberData = async () => {
    try {
      if (isAdmin) {
        const result = await memberslist();
        if (result.status) {
          setMembersListData(result.data);
        } else {
          throw new Error("Failed to fetch member list");
        }
      }
    } catch (error) {
      console.error("Error fetching member list:", error);
    }
  };
  useEffect(() => {
    fetchMemberData();
  }, [memberslist]);

  const fetchEffortData = async () => {
    try {
      if (params?.id) {
        const result = await effortList(params.id);
        if (result.status) {
          setEffortsListData(result.data);
        } else {
          throw new Error("Failed to fetch effort list");
        }
      }
    } catch (error) {
      console.error("Error fetching effort list:", error);
    }
  };

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
    fetchEffortData();
    fetchData();
  }, [params.id, purposelist, effortList]);

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
    const highestLocalId = effortsListData
      ? effortsListData.reduce((maxId, effort) => {
          return effort.local_id > maxId ? effort.local_id : maxId;
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
        selectedProductOutcomes,
        selectedDesignEfforts[0]
      );

      if (result.status) {
        toaster("effort added successfully", TOAST_TYPES.SUCCESS);
        fetchEffortData();
        setSelectedPurpose(null);
        setSelectedProductOutcomes(null);
        setSelectedDesignEfforts(null);
        setLink("");
        setLinks([]);
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

    // Handle lifetime reset
    if (option === "Lifetime") {
      handleLifetimeClick();
      return;
    }

    switch (option) {
      case "Monthly":
        setSelectedOptionItem(
          `${new Date().getFullYear()}-${months[new Date().getMonth()]}`
        );
        break;
      case "Weekly":
        setSelectedOptionItem(
          `${new Date().getFullYear()}-Week ${getISOWeek(new Date())}`
        );
        break;
      case "Quarterly":
        setSelectedOptionItem(getCurrentQuarter());
        break;
      default:
        setSelectedOptionItem(null);
        break;
    }
    setIsLifetimeClicked(false);
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
    setIsLifetimeClicked(false);
  };
  const renderDates = () => {
    const activeDates = new Set(); // Use a set to track active dates

    // Collect active dates based on selectedOption and purposeListData
    effortsListData?.forEach((purpose) => {
      const createdDate = new Date(purpose.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      switch (selectedOption) {
        case "Monthly":
          activeDates.add(`${year}-${month}`);
          break;
        case "Weekly":
          activeDates.add(`${year}-${week}`);
          break;
        case "Quarterly":
          activeDates.add(`${year}-${quarter}`);
          break;
        default:
          break;
      }
    });

    return (
      <ul className="timeline-dates">
        {years.map((year) => (
          <React.Fragment key={year}>
            {selectedOption === "Monthly" &&
              months.map(
                (month, index) =>
                  activeDates.has(`${year}-${month}`) && (
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
                  )
              )}

            {selectedOption === "Weekly" &&
              weeks.map(
                (week, index) =>
                  activeDates.has(`${year}-${week}`) && (
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
                  )
              )}

            {selectedOption === "Quarterly" &&
              quarters.map(
                (quarter, index) =>
                  activeDates.has(`${year}-${quarter}`) && (
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
                  )
              )}

            {/* Render faint bottom border after each year */}
            <div className="border_bottom_faint w-100" key={`border-${year}`} />
          </React.Fragment>
        ))}
      </ul>
    );
  };

  const getCurrentQuarter = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) {
      return `${year}-Q1`;
    } else if (month >= 4 && month <= 6) {
      return `${year}-Q2`;
    } else if (month >= 7 && month <= 9) {
      return `${year}-Q3`;
    } else {
      return `${year}-Q4`;
    }
  };

  useEffect(() => {
    // Set selectedOptionItem to current quarter initially
    setSelectedOptionItem(getCurrentQuarter());
  }, []);
  function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }
  const filteredEffort = effortsListData?.filter((purpose) => {
    if (isLifetimeClicked) {
      return true; // Show all if lifetime clicked
    }

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
        return `${purposeYear}-${purposeMonth}` === selectedOptionItem;
      case "Weekly":
        return `${purposeYear}-${purposeWeek}` === selectedOptionItem;
      case "Quarterly":
        return `${purposeYear}-${purposeQuarter}` === selectedOptionItem;
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
                filteredEffort.reverse().map((effort) =>
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
                          user={userdetail}
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
                      <div className="section-project mb-24">
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
                                    userdetail.profile_pic
                                      ? userdetail.profile_pic
                                      : "/assets/images/mark/profile.png"
                                  }
                                  alt="profile"
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <h2 className="create-name">
                                {userdetail.fullname}
                              </h2>
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
                            {effort.outcomes &&
                              effort.outcomes.map((outcomeId) => (
                                <li key={outcomeId} className="p-0 selectedone">
                                  <span className="dot black"></span>
                                  {objectives.find(
                                    (obj) => obj.id === outcomeId
                                  )?.title || ""}
                                </li>
                              ))}
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
                            <DropdownCheckedlist
                              fetchMemberData={fetchMemberData}
                              effort={effort}
                              getStatusImage={getStatusImage}
                              getStatusStyles={getStatusStyles}
                              isAdmin={isAdmin}
                              fetchEffortData={fetchEffortData}
                            />
                          </div>
                          {isAdmin && (
                            <div className="d-flex align-items-center gap-4">
                              <h1 className="select-outcome-text">
                                Checked By:
                              </h1>

                              {effort.checked_by ? (
                                (() => {
                                  const checkedMember = membersListData?.find(
                                    (member) => member.id === effort?.checked_by
                                  );

                                  return (
                                    <div className="checkedby-container d-flex align-items-center gap-1">
                                      <div className="checkby-image relative">
                                        <img
                                          src={
                                            checkedMember?.profile_pic
                                              ? checkedMember?.profile_pic
                                              : "/assets/images/mark/profile.png"
                                          }
                                          alt={checkedMember?.fullname}
                                          style={{
                                            position: "absolute",
                                            top: "0",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            height: "100%",
                                          }}
                                        />
                                      </div>
                                      <h2 className="checkby-name">
                                        <span>{checkedMember?.fullname}</span>
                                      </h2>
                                    </div>
                                  );
                                })()
                              ) : (
                                <div className="no-checked"></div>
                              )}
                            </div>
                          )}
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
              <div className="d-flex align-items-center flex-column border_bottom_faint pb-24 ">
                <div
                  className="d-flex align-items-center gap-1 justify-content-center cursor-pointer mb-24"
                  onClick={toggleDropdown}
                >
                  <h1 className="timeline-text">Timeline</h1>
                  <img
                    src="/assets/images/mark/dropdown-icon.svg"
                    alt="dropdown-icon"
                  />
                </div>
                <div
                  onClick={() => handleOptionClick("Lifetime")}
                  className={`cursor-pointer lifetime ${
                    isLifetimeClicked ? "active" : ""
                  }`}
                >
                  <h1 className="timeline-text">Lifetime</h1>
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
              </div>
              {renderDates()}
            </div>
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
