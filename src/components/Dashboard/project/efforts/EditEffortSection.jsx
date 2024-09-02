import React, { useState } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import LinkModel from "@/components/shared/model/LinkModel";
import SingleProductOutcomesModel from "@/components/shared/model/SingleProductOutcomesModel";
import SingleProjectDesignEffort from "@/components/shared/model/SingleProjectDeisngEffort";
import PurposeList from "@/components/shared/model/PurposeList";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import CombinedEffortModel from "@/components/shared/model/CombinedEffortModel";

const EditEffortSection = ({
  effort,
  user,
  handleCancel,
  setDesign,
  objectives,
  design,
  fetchData,
  setPurposeToEdit,
  purposeListData,
  setPurposeListData,
  fetchEffortData,
  setLink,
  link,
  setLinks,
  links,
}) => {
  const { updateEffort, removeEffort } = useAuth();

  const [purposedropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [designdropdownOpen, setDesigndropdownOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [selectedProductOutcomes, setSelectedProductOutcomes] = useState(
    effort?.outcomes || ""
  );

  const { toaster } = useToaster();
  const [selectedDesignEfforts, setSelectedDesignEfforts] = useState(
    effort?.design_effort ? [effort.design_effort] : []
  );

  const [selectedLinks, setSelectedLinks] = useState(effort?.links || "");

  const [selectedPurpose, setSelectedPurpose] = useState(effort?.purpose || "");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tab, setTab] = useState("");

  const areAllFieldsFilled = () => {
    return (
      selectedProductOutcomes.length > 0 &&
      selectedDesignEfforts.length > 0 &&
      selectedPurpose
    );
  };

  // Tooltip text
  const tooltipText = "All info must be filled";

  const handleButtonClick = (tabName) => {
    setTab(tabName);
    setDropdownOpen((prev) => !prev);
  };

  const togglePurposeDropdown = (state) => {
    setPurposeDropdownOpen(state);
  };
  const handleEditLink = (index) => {
    const editedLink = selectedLinks[index];
    setLink(editedLink.link);
  };

  const addLink = (url) => {
    // Implement adding link logic here
    setSelectedLinks([...selectedLinks, { url }]);
  };

  const handleSaveClick = async () => {
    // Prepare edited effort data
    const editedEffort = {
      ...effort,
      outcomes: selectedProductOutcomes,
      design_effort: selectedDesignEfforts[0],
      purpose: selectedPurpose,
      links: selectedLinks,
    };

    const { outcomes, design_effort, purpose, links } = editedEffort;
    const project_effort_id = effort?.id;

    try {
      const response = await updateEffort(
        project_effort_id,
        links,
        purpose,
        outcomes,
        design_effort
      );

      if (response.status) {
        toaster("Effort updated successfully", TOAST_TYPES.SUCCESS);
        fetchEffortData();
        setPurposeToEdit(null);
      } else {
        toaster("Failed to update effort", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const toggledesigndropdown = (state) => {
    setDesigndropdownOpen(state);
  };

  const toggleDesignDropdown = (state) => {
    setDesignDropdownOpen(state);
  };
  const handleDeleteClick = async () => {
    try {
      const response = await removeEffort(effort.id); // Assuming purpose.id is accessible in your props or context

      if (response.status) {
        toaster("Purpose deleted successfully:", TOAST_TYPES.SUCCESS);

        fetchEffortData();
        setPurposeToEdit(null);
      } else {
        toaster("Failed to delete purpose", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <>
      <div className="new-effort-create  w-100 ">
        <div className="pb-16 d-flex align-items-center border_bottom_lavender-blush justify-content-between w-100">
          <h1 className="create-id f-16">{`#eff${
            effort?.local_id < 10
              ? `00${effort?.local_id}`
              : effort?.local_id < 100
              ? `0${effort?.local_id}`
              : effort?.local_id
          }`}</h1>

          <div className="d-flex align-items-center gap-2">
            <button className="delete-btn mr-12" onClick={handleDeleteClick}>
              <img src="/assets/images/mark/delete.png" alt="delete-icon" />
            </button>
            <div className="d-flex align-items-center gap-2 border-left-lavender-blush  pl-12">
              <button className="close_effort_btn" onClick={handleCancel}>
                <span>Cancel</span>
              </button>
              <button
                className="save_effort_btn"
                onClick={handleSaveClick}
                disabled={!areAllFieldsFilled()}
                title={!areAllFieldsFilled() ? tooltipText : ""}
              >
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 pt-16 pb-16 border_bottom_lavender-blush">
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
                  height: "100%",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
            <h2 className="create-name">{user.fullname}</h2>
          </div>
        </div>

        <div className="border_bottom_lavender-blush pt-16 pb-16 d-flex align-items-center gap-3">
          <button
            className="add-project_btn "
            onClick={() => handleButtonClick("effort")}
          >
            <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
            <span className="add-text">Effort type</span>
          </button>
          <button
            className="add-project_btn"
            onClick={() => handleButtonClick("outcomes")}
          >
            <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
            <span className="add-text">Outcome</span>
          </button>
          <button
            className="add-project_btn"
            onClick={() => handleButtonClick("purpose")}
          >
            <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
            <span className="add-text">purpose</span>
          </button>
          <button
            className="add-project_btn"
            onClick={() => handleButtonClick("links")}
          >
            <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
            <span className="add-text">Links</span>
          </button>
        </div>
        <div className="pt-16">
          <div className="d-flex align-items-center mb-24 gap-3">
            <h1 className="select-outcome-text w-20">Effort type:</h1>

            <ul className=" d-flex align-items-center m-0 w-80 p-0">
              {selectedDesignEfforts.map((value) => (
                <li key={value} className="p-0 selectedone">
                  {design
                    .flatMap((category) => category.items)
                    .find((obj) => obj.id === value)?.title || ""}
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex align-items-start mb-24 gap-3">
            <h1 className="select-outcome-text w-20">Outcome:</h1>

            <ul
              className=" d-flex align-items-center m-0 flex-wrap w-80 p-0"
              style={{ gap: "0 40px" }}
            >
              {selectedProductOutcomes &&
                selectedProductOutcomes.map((outcomeId) => (
                  <li key={outcomeId} className="p-0 selectedone">
                    {objectives.find((obj) => obj.id === outcomeId)?.title ||
                      ""}
                  </li>
                ))}
            </ul>
          </div>

          <div className="  d-flex align-items-start mb-24 gap-3">
            <h1 className="select-outcome-text w-20">Purpose:</h1>

            <ul className="d-flex align-items-center gap-4 w-80 p-0">
              {selectedPurpose && (
                <li key={selectedPurpose} className="p-0 selectedone text-wrap">
                  {purposeListData?.find((obj) => obj.id === selectedPurpose)
                    ?.title || ""}
                </li>
              )}
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <h1 className="select-outcome-text w-20">Links:</h1>

            <ul
              className="d-flex flex-wrap align-items-center m-0  p-0 w-80 "
              style={{ gap: "0 40px" }}
            >
              {selectedLinks?.map((link, index) => (
                <div
                  key={index}
                  className="show-selectedone selectedone cursor-pointer"
                  onClick={() => handleEditLink(index)}
                >
                  <li className="p-0">
                    <a
                      style={{
                        textDecoration: "underline",
                      }}
                      className="selectedone"
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`Link ${index + 1}`}{" "}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* <ProductOutcomesModel
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
        links={selectedLinks}
        setLinks={setSelectedLinks}
      />
    </>
  );
};

export default EditEffortSection;
