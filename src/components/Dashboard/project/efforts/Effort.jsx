import React, { useEffect, useState, useCallback, useRef } from "react";
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
import SidebarTimelineComponent from "@/components/shared/SidebarTimelineComponent";
import {
  months,
  weeks,
  quarters,
  getCurrentDate,
  getCurrentQuarter,
} from "@/utils/timeConstants";
import CombinedEffortModel from "@/components/shared/model/CombinedEffortModel";

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

  const [selectedOption, setSelectedOption] = useState("Quarterly");
  const [selectedOptionItem, setSelectedOptionItem] = useState(null);
  const [userdetail, setUserDetail] = useState([]);

  const [isLifetimeClicked, setIsLifetimeClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [memberlist, setMemberList] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tab, setTab] = useState("");

  const handleButtonClick = (tabName) => {
    setTab(tabName);
    setDropdownOpen((prev) => !prev);
  };

  const { toaster } = useToaster();

  const [link, setLink] = useState("");

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchUserinfo = async () => {
      const res = await userinfo();
      if (res && res.status) {
        setUser(res.data);
      }
    };

    fetchUserinfo();
  }, [userinfo]);

  useEffect(() => {
    const fetchMemberinfo = async () => {
      const res = await memberslist();
      if (res && res.status) {
        setMemberList(res.data);
      }
    };

    fetchMemberinfo();
  }, [memberslist, useradd]);
  // Handle lifetime click
  const handleLifetimeClick = () => {
    setIsLifetimeClicked(true);
    setSelectedOptionItem(null);
    setIsDropdownOpen(false);
  };

  const togglePurposeDropdown = (state) => {
    setPurposeDropdownOpen(state);
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

  useEffect(() => {
    fetchEffortData();
    fetchData();
  }, [params.id, purposelist, effortList, memberslist]);

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
          backgroundColor: "#483956",
          color: "white",
          padding: "12px 16px",
          borderRadius: "12px",
        };
      case "UCH":
        return {
          backgroundColor: "#F24E1E",
          color: "white",
          padding: "12px 16px",
          borderRadius: "12px",
        };
      case "UPA":
        return {
          backgroundColor: "#723D46",
          color: "white",
          padding: "12px 16px",
          borderRadius: "12px",
        };
      case "REA":
        return {
          backgroundColor: "#128E5E",
          color: "white",
          padding: "12px 28px",
          borderRadius: "12px",
        };
      case "VUR":
        return {
          backgroundColor: "#F58E07",
          color: "white",
          padding: "12px 20px",
          borderRadius: "12px",
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
    // Handle lifetime reset
    if (option === "Lifetime") {
      handleLifetimeClick();
      return;
    }

    setSelectedOption(option);

    const currentYear = new Date().getFullYear();
    let selectedItem = null;

    switch (option) {
      case "Monthly":
        selectedItem = `${currentYear}-${months[new Date().getMonth()]}`;
        break;
      case "Weekly":
        selectedItem = `${currentYear}-Week ${getISOWeek(new Date())}`;
        break;
      case "Quarterly":
        selectedItem = getCurrentQuarter();
        break;
      default:
        selectedItem = null;
        break;
    }

    // Check if the current selection exists in purposeListData
    const currentExists = effortsListData?.some((purpose) => {
      const createdDate = new Date(purpose.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      switch (option) {
        case "Monthly":
          return `${year}-${month}` === selectedItem;
        case "Weekly":
          return `${year}-${week}` === selectedItem;
        case "Quarterly":
          return `${year}-${quarter}` === selectedItem;
        default:
          return false;
      }
    });

    // If the current selection doesn't exist, select the last available date
    if (!currentExists) {
      const lastAvailableItem = effortsListData
        ?.map((purpose) => {
          const createdDate = new Date(purpose.created_at);
          const year = createdDate.getFullYear();
          const month = months[createdDate.getMonth()];
          const week = `Week ${getISOWeek(createdDate)}`;
          const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

          switch (option) {
            case "Monthly":
              return `${year}-${month}`;
            case "Weekly":
              return `${year}-${week}`;
            case "Quarterly":
              return `${year}-${quarter}`;
            default:
              return null;
          }
        })
        .filter(Boolean)
        .reverse()[0];

      setSelectedOptionItem(lastAvailableItem);
    } else {
      setSelectedOptionItem(selectedItem);
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
      effortsListData?.map((purpose) =>
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
                        <span>{quarter}</span>
                        <span>{year}</span>
                      </li>
                    )
                )}
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
            <div className="effort-list">
              <NewEffortSection
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
                handleButtonClick={handleButtonClick}
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
                          user={user}
                          handleCancel={handleCancelEdit}
                          objectives={objectives}
                          design={design}
                          setDesign={setDesign}
                          setPurposeToEdit={setEffortToEdit}
                          fetchEffortData={fetchEffortData}
                          fetchData={fetchData}
                        />
                      }
                    </>
                  ) : (
                    <div key={effort.id}>
                      <div className="section-project mb-24">
                        <div className="pb-26 d-flex align-items-center justify-content-between w-100 border_bottom_lavender-blush">
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <h1 className="create-id f-16">{`#eff${
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
                              {effort?.user === user?.id &&
                                effort?.value_status !== "UCH" && (
                                  <button
                                    className="edit-button"
                                    onClick={() => handleEditClick(effort)}
                                  >
                                    <img
                                      className="edit-image"
                                      src="/assets/images/mark/edit.svg"
                                      alt="edit-con"
                                    />
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 border_bottom_lavender-blush pt-18 pb-18">
                          <h2 className="create-name weight-500">
                            Effort created by:
                          </h2>
                          <div className="d-flex align-items-center gap-1">
                            {(() => {
                              // Find user in userdetail
                              const user = userdetail.find(
                                (user) => user.id === effort.user
                              );

                              // If user is not found in userdetail, check memberlistdata
                              const userInMemberList = user
                                ? user
                                : memberlist.find(
                                    (member) => member.id === effort.user
                                  );

                              if (userInMemberList) {
                                return (
                                  <>
                                    <div className="create_profile">
                                      <img
                                        src={
                                          userInMemberList.profile_pic
                                            ? userInMemberList.profile_pic
                                            : "/assets/images/mark/profile.png"
                                        }
                                        alt="profile"
                                        style={{
                                          position: "absolute",
                                          top: "0",
                                          objectFit: "cover",
                                          height: "100%",
                                          width: "100%",
                                        }}
                                      />
                                    </div>
                                    <h2 className="create-name">
                                      {userInMemberList.fullname}
                                    </h2>
                                  </>
                                );
                              } else {
                                return <></>;
                              }
                            })()}
                          </div>
                        </div>
                        <div className="d-flex gap-2  justify-content-between flex-column w-100 border_bottom_lavender-blush pt-18 pb-18">
                          <div className="d-flex align-items-start  gap-3 mb-24">
                            <h1 className="select-outcome-text w-20">
                              Effort type:
                            </h1>

                            <ul className=" d-flex align-items-center m-0 flex-wrap gap-4 w-80 p-0">
                              {effort.design_effort && (
                                <li
                                  key={effort.design_effort}
                                  className="p-0 selectedone"
                                >
                                  {design
                                    .flatMap((category) => category.items)
                                    .find(
                                      (obj) => obj.id === effort.design_effort
                                    )?.title || ""}
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="d-flex align-items-start gap-3  mb-24">
                            <h1 className="select-outcome-text w-20">
                              Outcome:
                            </h1>

                            <ul
                              className=" d-flex align-items-center m-0 flex-wrap  w-80 p-0"
                              style={{ gap: "0 40px" }}
                            >
                              {effort.outcomes &&
                                effort.outcomes.map((outcomeId) => (
                                  <li
                                    key={outcomeId}
                                    className="p-0 selectedone "
                                  >
                                    {objectives.find(
                                      (obj) => obj.id === outcomeId
                                    )?.title || ""}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="d-flex align-items-start gap-3  mb-24">
                            <h1 className="select-outcome-text w-20">
                              Purpose:
                            </h1>

                            <ul className=" d-flex align-items-center m-0 flex-wrap gap-4 w-80 p-0">
                              {effort.purpose && (
                                <li
                                  key={effort.purpose}
                                  className="p-0 selectedone text-wrap"
                                >
                                  {purposeListData?.find(
                                    (obj) => obj.id === effort.purpose
                                  )?.title || ""}
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="d-flex align-items-start gap-3">
                            <h1 className="select-outcome-text w-20">Links:</h1>

                            <ul
                              className=" d-flex align-items-center m-0 flex-wrap  w-80 p-0"
                              style={{ gap: "0 40px" }}
                            >
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
                            </ul>
                          </div>
                        </div>
                        <div className=" d-flex gap-2  justify-content-between flex-column w-100  pt-18">
                          <div className="d-flex align-items-center gap-2 mb-24">
                            <h1 className="select-outcome-text">
                              Value status:
                            </h1>
                            <DropdownCheckedlist
                              effort={effort}
                              getStatusImage={getStatusImage}
                              getStatusStyles={getStatusStyles}
                              isAdmin={isAdmin}
                              user={user}
                              fetchEffortData={fetchEffortData}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <h1 className="select-outcome-text">
                                Checked By:
                              </h1>

                              {(() => {
                                // Try to find checked member in userdetail
                                let checkedMember = userdetail?.find(
                                  (member) => member.id === effort.checked_by
                                );

                                // If not found in userdetail, try memberlist
                                if (!checkedMember) {
                                  checkedMember = memberlist?.find(
                                    (member) => member.id === effort.checked_by
                                  );
                                }

                                // Render checked member or placeholder if not found
                                if (checkedMember) {
                                  return (
                                    <div className="d-flex align-items-center gap-1">
                                      <div className="checkby-image relative">
                                        <img
                                          src={
                                            checkedMember.profile_pic
                                              ? checkedMember.profile_pic
                                              : "/assets/images/mark/profile.png"
                                          }
                                          alt={checkedMember.fullname}
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
                                        <span>{checkedMember.fullname}</span>
                                      </h2>
                                    </div>
                                  );
                                } else {
                                  return <></>;
                                }
                              })()}
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <h2 className="create-name weight-500">On:</h2>
                              {effort.checked_by ? (
                                <h2 className="create-name">
                                  {new Date(
                                    effort.checked_at
                                  ).toLocaleDateString()}
                                </h2>
                              ) : (
                                <div className="space-effort-date "></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
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
      </div>
      {/* <SingleProductOutcomesModel
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
      /> */}
      <CombinedEffortModel
        tab={tab}
        dropdownOpen={dropdownOpen}
        toggleDropdown={handleButtonClick}
        objectives={objectives}
        purpose={purposeListData}
        design={design}
        selectedProductOutcomes={selectedProductOutcomes}
        setSelectedProductOutcomes={setSelectedProductOutcomes}
        selectedPurpose={selectedPurpose}
        setSelectedPurpose={setSelectedPurpose}
        selectedDesignEfforts={selectedDesignEfforts}
        setSelectedDesignEfforts={setSelectedDesignEfforts}
        setDesign={setDesign}
        link={link}
        setLink={setLink}
        links={links}
        setLinks={setLinks}
      />
    </>
  );
};

export default Effort;
