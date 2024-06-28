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

  const [design, setDesign] = useState([]);

  const [purposeListData, setPurposeListData] = useState(null);

  const [purposeToEdit, setPurposeToEdit] = useState(null);
  const [purposedropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [effortsListData, setEffortsListData] = useState(null);
  console.log("🚀 ~ Effort ~ effortsListData:", effortsListData);

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
        console.log("🚀 ~ fetchEffortData ~ result:", result);
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

  return (
    <>
      <div className="wrapper-company">
        <div className="company-sidebar w-100 d-flex flex-column gap-4">
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

            {effortsListData &&
              effortsListData.map((effort) =>
                purposeToEdit && purposeToEdit.id === effort.id ? (
                  <>
                    {/* {
                    <EditPurposeSection
                      key={purpose.id}
                      purpose={purposeToEdit}
                      user={user}
                      handleCancel={handleCancelEdit}
                      objectives={objectives}
                      design={design}
                      setDesign={setDesign}
                      setPurposeToEdit={setPurposeToEdit}
                    />
                  } */}
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
                          <div className="d-flex align-items-center gap-2">
                            <h2 className="create-name weight-500">
                              Created on:
                            </h2>
                            <h2 className="create-name">
                              {new Date(effort.created_at).toLocaleDateString()}
                            </h2>
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
                                .find((obj) => obj.id === effort.design_effort)
                                ?.title || ""}
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
                      <div className="pb-24 d-flex gap-2  justify-content-between flex-column w-100 border-bottom-grey pt-24">
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
                          <h1 className="select-outcome-text">Value status:</h1>
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
                                  alt={statusDescriptions[effort?.value_status]}
                                />
                              )}
                            </span>
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
