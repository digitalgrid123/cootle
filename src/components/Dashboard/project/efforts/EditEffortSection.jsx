import React, { useState } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import LinkModel from "@/components/shared/model/LinkModel";
import SingleProductOutcomesModel from "@/components/shared/model/SingleProductOutcomesModel";
import SingleProjectDesignEffort from "@/components/shared/model/SingleProjectDeisngEffort";
import PurposeList from "@/components/shared/model/PurposeList";
import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";

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
}) => {
  console.log("🚀 ~ user:", user);
  const { updateEffort, removeEffort } = useAuth();
  const [link, setLink] = useState();

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

  const [showLinkModel, setShowLinkModel] = useState(false);

  const tooglelinkmodel = () => {
    setShowLinkModel((prev) => !prev);
  };
  const togglePurposeDropdown = (state) => {
    setPurposeDropdownOpen(state);
  };
  const handleEditLink = (index) => {
    const editedLink = selectedLinks[index];
    setLink(editedLink.link);
    setShowLinkModel(true);
  };

  const addLink = (url) => {
    // Implement adding link logic here
    setSelectedLinks([...selectedLinks, { url }]);
    setShowLinkModel(false);
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
        fetchData();
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
      <div className="col-lg-6">
        <div className="new-purpose-section w-100 mb-24">
          <div className="new-purpose-create w-100">
            <div className="mb-24 d-flex align-items-center justify-content-between w-100">
              <h1 className="create-id">{`#eff${
                effort?.local_id < 10
                  ? `00${effort?.local_id}`
                  : effort?.local_id < 100
                  ? `0${effort?.local_id}`
                  : effort?.local_id
              }`}</h1>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="delete-btn mr-12"
                  onClick={handleDeleteClick}
                >
                  <img src="/assets/images/mark/delete.png" alt="delete-icon" />
                </button>
                <div className="d-flex align-items-center gap-2 border-left-faint pl-12">
                  <button className="close_effort_btn" onClick={handleCancel}>
                    <span>Cancel</span>
                  </button>
                  <button className="save_effort_btn" onClick={handleSaveClick}>
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="ptb-34 border-bottom-grey">
              <div className="d-flex align-items-center gap-2 mb-24">
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
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <h2 className="create-name">{user.fullname}</h2>
                </div>
              </div>
              <div className="d-flex align-items-center mb-20">
                <div
                  className="d-flex align-items-center  "
                  style={{ gap: "50px" }}
                >
                  <h1 className="select-outcome-text">Type:</h1>
                  <button
                    className="add-project_btn "
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
                <ul className=" d-flex align-items-center ">
                  {selectedDesignEfforts.map((value) => (
                    <li key={value} className="p-0 selectedone">
                      <span className="dot black"></span>
                      {design
                        .flatMap((category) => category.items)
                        .find((obj) => obj.id === value)?.title || ""}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center "
                  style={{ gap: "20px" }}
                >
                  <h1 className="select-outcome-text">Outcome:</h1>
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
                <ul className="mt-20 d-flex align-items-center ">
                  {selectedProductOutcomes &&
                    selectedProductOutcomes.map((outcomeId) => (
                      <li key={outcomeId} className="p-0 selectedone">
                        <span className="dot black"></span>
                        {objectives.find((obj) => obj.id === outcomeId)
                          ?.title || ""}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="ptb-34 border-bottom-grey d-flex align-items-center">
              <div className="d-flex align-items-center gap-4">
                <h1 className="select-outcome-text">Purpose:</h1>
                <button
                  className="add-project_btn"
                  onClick={() => togglePurposeDropdown(true)}
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
              <ul className="mt-20 d-flex align-items-center gap-4">
                {selectedPurpose && (
                  <li key={selectedPurpose} className="p-0 selectedone">
                    <span className="dot black"></span>
                    {purposeListData?.find((obj) => obj.id === selectedPurpose)
                      ?.title || ""}
                  </li>
                )}
              </ul>
            </div>
            <div className="mt-20 ">
              <LinkModel
                showLinkModel={showLinkModel}
                link={link}
                setLink={setLink}
                addLink={addLink}
                setShowLinkModel={setShowLinkModel}
              />
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-4 mt-20 ">
                  <h1 className="select-outcome-text">Add link:</h1>
                  <button className="add-project_btn" onClick={tooglelinkmodel}>
                    <span className="add-text">link</span>
                    <span>
                      <img
                        src="/assets/images/mark/addoutcomesbtn.svg"
                        alt="add-btn"
                      />
                    </span>
                  </button>
                </div>
                <ul className="d-flex flex-wrap align-items-center m-0 gap-2 flex-wrap">
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

export default EditEffortSection;
