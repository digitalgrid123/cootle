import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useAuth, useToaster } from "@/hooks";

import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import NewPurposeSection from "./NewPurposeSection";
import EditPurposeSection from "./EditPurposeSection";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import ProjectDesignEffort from "@/components/shared/model/ProjectDesignEffort";
import SidebarTimelineComponent from "@/components/shared/SidebarTimelineComponent";
import {
  months,
  weeks,
  quarters,
  getCurrentQuarter,
  getCurrentDate,
} from "@/utils/timeConstants";
import CombinedDropdown from "@/components/shared/model/CombinedPurposeDropdown";
import CombinedPurposeDropdown from "@/components/shared/model/CombinedPurposeDropdown";

const Purpose = ({ onToggleNewPurpose, showNewPurposeInput }) => {
  const {
    purposelist,
    userinfo,
    reteriveEffort,
    mappingList,
    createPurpose,
    userinfobyId,
    useradd,
  } = useAuth();

  const params = useParams();
  const [lastIdNumber, setLastIdNumber] = useState(0);
  const [objectives, setObjectives] = useState([]);
  const [productdropdownOpen, setProductdropdownOpen] = useState(false);
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
  const [userdetail, setUserDetail] = useState([]);

  const [isLifetimeClicked, setIsLifetimeClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tab, setTab] = useState("");

  const handleButtonClick = (tabName) => {
    setTab(tabName);
    setDropdownOpen((prev) => !prev);
  };
  const fetchUserinfo = async () => {
    const res = await userinfo();

    if (res && res.status) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchUserinfo();
  }, [userinfo]);
  // Handle lifetime click
  const handleLifetimeClick = () => {
    setIsLifetimeClicked(true);
    setSelectedOption("Quarterly"); // Set a default option if needed
    setSelectedOptionItem(null); // Reset selected item
    setIsDropdownOpen(false); // Close dropdown if open
  };

  const fetchUserinfoById = async (userId) => {
    try {
      const res = await userinfobyId(userId);

      if (res && res.status && res.data) {
        setUserDetail((prevDetails) => {
          const userExists = prevDetails.some(
            (user) => user.id === res.data.id
          );
          if (!userExists) {
            return [...prevDetails, res.data];
          } else {
            return prevDetails.map((user) =>
              user.id === res.data.id ? res.data : user
            );
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (purposeListData && purposeListData.length > 0) {
      purposeListData.forEach((purpose) => fetchUserinfoById(purpose.user));
    }
  }, [purposeListData, useradd]);

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
  }, [params.id, purposelist.useradd]);

  const fetchDesignEfforts = useCallback(
    async (designEffortIds) => {
      try {
        // Assuming reteriveEffort can accept an array of IDs and return data for all of them
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

          // Collect all design effort IDs from all objectives
          const allDesignEffortIds = objectivesData.flatMap(
            (obj) => obj.design_efforts
          );

          if (allDesignEffortIds.length > 0) {
            // Fetch all design efforts in a single call
            const allDesignEfforts = await fetchDesignEfforts(
              allDesignEffortIds
            );

            // Create a map of design effort IDs to their corresponding data
            const designEffortsMap = allDesignEfforts.reduce((acc, effort) => {
              acc[effort.id] = effort;
              return acc;
            }, {});

            // Map objectives to include the fetched design efforts
            const objectivesWithDesignEfforts = objectivesData.map((obj) => {
              const designEfforts = obj.design_efforts.map(
                (id) => designEffortsMap[id]
              );
              return { ...obj, design_efforts: designEfforts };
            });

            setObjectives(objectivesWithDesignEfforts);
          } else {
            setObjectives(objectivesData);
          }
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

  const toggleproductdropdown = (state) => {
    setProductdropdownOpen(state);
    setTab("outcomes");
  };

  const toggleDesignDropdown = (state) => {
    setDesignDropdownOpen(state);
    setTab("design");
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
    purposeListData?.forEach((purpose) => {
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
        {years.reverse().map((year) => (
          <React.Fragment key={year}>
            {selectedOption === "Monthly" &&
              months
                .slice()
                .reverse()
                .map(
                  (month, index) =>
                    activeDates.has(`${year}-${month}`) && (
                      <li
                        key={`${year}-${month}-${index}`}
                        className={`cursor-pointer  ${isActive(year, month)} ${
                          index === months.length - 1
                            ? "last-item active-tab"
                            : ""
                        }`}
                        onClick={() => handleDateClick(year, month)}
                      >
                        <span>{month}</span>
                        <span>{year}</span>
                      </li>
                    )
                )}

            {selectedOption === "Weekly" &&
              weeks
                .slice()
                .reverse()
                .map(
                  (week, index) =>
                    activeDates.has(`${year}-${week}`) && (
                      <li
                        key={`${year}-${week}-${index}`}
                        className={`cursor-pointer  ${isActive(year, week)} ${
                          index === weeks.length - 1
                            ? "last-item active-tab"
                            : ""
                        }`}
                        onClick={() => handleDateClick(year, week)}
                      >
                        <span className="week">{week}</span>
                        <span className="year">{year}</span>
                      </li>
                    )
                )}

            {selectedOption === "Quarterly" &&
              quarters
                .slice()
                .reverse()
                .map(
                  (quarter, index) =>
                    activeDates.has(`${year}-${quarter}`) && (
                      <li
                        key={`${year}-${quarter}-${index}`}
                        className={`cursor-pointer   ${isActive(
                          year,
                          quarter
                        )} ${
                          index === quarters.length - 1 ? "last-item " : ""
                        }`}
                        onClick={() => handleDateClick(year, quarter)}
                      >
                        <span className="quarter">{quarter}</span>
                        <span className="year">{year}</span>
                      </li>
                    )
                )}

            <div
              className="border_bottom_soft-lavender w-100"
              key={`border-${year}`}
            />
          </React.Fragment>
        ))}
      </ul>
    );
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
  const filteredPurposes = purposeListData?.filter((purpose) => {
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
    <div className="d-flex flex-row gap-3 h-100  justify-content-between">
      <div className="wrapper-company w-100">
        <div className="company-sidebar w-100 d-flex flex-column gap-4">
          <NewPurposeSection
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
            toggledesigndropdown={toggleproductdropdown}
            selectedProductOutcomes={selectedProductOutcomes}
            objectives={objectives}
            toggleDesignDropdown={toggleDesignDropdown}
            selectedDesignEfforts={selectedDesignEfforts}
            design={design}
            handleButtonClick={handleButtonClick}
          />
          {filteredPurposes && filteredPurposes.length > 0 ? (
            filteredPurposes.reverse().map((purpose) =>
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
                  <div className="responsive-container pb-24 d-flex align-items-center justify-content-between w-100 border_bottom_pastel">
                    <div className="d-flex align-items-center gap-3 first-row">
                      <h1 className="create-id f-18">
                        <span className="f-14">#pur</span>
                        {`${
                          purpose?.local_id < 10
                            ? `00${purpose?.local_id}`
                            : purpose?.local_id < 100
                            ? `0${purpose?.local_id}`
                            : purpose?.local_id
                        }`}
                      </h1>

                      <h1
                        className="create-id f-18 truncate"
                        title={purpose?.title}
                      >
                        <span className="f-14">#</span>
                        {purpose?.title}
                      </h1>
                    </div>
                    <div className="d-flex align-items-center gap-3 second-row relative">
                      <div className="d-flex align-items-center gap-2">
                        <h2 className="create-name weight-500">Created by:</h2>
                        {userdetail.some((user) => user.id === purpose.user) ? (
                          <>
                            <div className="create_profile">
                              <img
                                src={
                                  userdetail.find(
                                    (user) => user.id === purpose.user
                                  ).profile_pic
                                    ? userdetail.find(
                                        (user) => user.id === purpose.user
                                      ).profile_pic
                                    : "/assets/images/mark/profile.png"
                                }
                                alt="profile"
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  objectFit: "cover",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <h2 className="create-name">
                              {
                                userdetail.find(
                                  (user) => user.id === purpose.user
                                ).fullname
                              }
                            </h2>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <h2 className="create-name weight-500">Created on:</h2>
                        <h2 className="create-name">
                          {new Date(purpose.created_at).toLocaleDateString()}
                        </h2>
                      </div>
                      {purpose.user === user?.id && (
                        <button
                          className="edit-button absolute-edit-button"
                          onClick={() => handleEditClick(purpose)}
                        >
                          <img
                            src="/assets/images/mark/edit.svg"
                            alt="Edit"
                            className="edit-image"
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-start  pb-24 border_bottom_pastel pt-24 gap-16">
                    <h2 className="selectedone weight-500">Problem summary:</h2>

                    <p className="selectedone m-0 text-wrap ">
                      {purpose.description}
                    </p>
                  </div>
                  <div className="d-flex align-items-start  pb-24 border_bottom_pastel pt-24 gap-16">
                    <h2 className="selectedone weight-500">
                      Desired outcomes:
                    </h2>

                    <div
                      className=" d-flex align-items-center m-0 flex-wrap "
                      style={{ gap: "0 40px" }}
                    >
                      {purpose?.desired_outcomes.map((effortId) => {
                        const matchingObjective = objectives.find(
                          (obj) => obj.id === effortId
                        );
                        return (
                          <li key={effortId} className="p-0 selectedone">
                            {matchingObjective?.title}
                          </li>
                        );
                      })}
                    </div>
                  </div>

                  <div className="d-flex align-items-start pb-16 pt-24 gap-35">
                    <h2 className="selectedone weight-500">
                      Design effort(s):
                    </h2>

                    <div
                      className=" d-flex align-items-center m-0 flex-wrap "
                      style={{ gap: "0 40px" }}
                    >
                      {purpose.design_efforts.map((effortId) => (
                        <li key={effortId} className="p-0 selectedone">
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
                </div>
              )
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <SidebarTimelineComponent
        isLifetimeClicked={isLifetimeClicked}
        isDropdownOpen={isDropdownOpen}
        selectedOption={selectedOption}
        toggleDropdown={toggleDropdown}
        handleOptionClick={handleOptionClick}
        renderDates={renderDates}
      />
      {/* <ProductOutcomesModel
        designdropdownOpen={productdropdownOpen}
        toggledesignDropdown={setProductdropdownOpen}
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
      /> */}
      <CombinedPurposeDropdown
        dropdownOpen={dropdownOpen}
        toggleDropdown={handleButtonClick}
        selectedDesignEfforts={selectedDesignEfforts}
        setSelectedDesignEfforts={setSelectedDesignEfforts}
        selectedProductOutcomes={selectedProductOutcomes}
        setSelectedProductOutcomes={setSelectedProductOutcomes}
        design={design}
        objectives={objectives}
        setDesign={setDesign}
        tab={tab}
      />
    </div>
  );
};

export default Purpose;
