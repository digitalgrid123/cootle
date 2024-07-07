import ProductOutcomesModel from "@/components/shared/model/ProductOutcomesModel";
import ProjectDesignEffort from "@/components/shared/model/ProjectDesignEffort";
import React, { useState } from "react";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";

const EditPurposeSection = ({
  purpose,
  user,
  handleCancel,
  setDesign,
  objectives,
  design,
  fetchData,
  setPurposeToEdit,
}) => {
  console.log("🚀 ~ EditPurposeSection:", EditPurposeSection);
  const { updatePurpose, removePurpose } = useAuth();
  const [title, setTitle] = useState(purpose.title);
  const [description, setDescription] = useState(purpose.description);
  const [designdropdownOpen, setDesigndropdownOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [selectedProductOutcomes, setSelectedProductOutcomes] = useState(
    purpose?.desired_outcomes || ""
  );

  const { toaster } = useToaster();
  const [selectedDesignEfforts, setSelectedDesignEfforts] = useState(
    purpose?.design_efforts || ""
  );

  const handleSaveClick = async () => {
    // Prepare edited purpose data
    const editedPurpose = {
      ...purpose,
      title, // Include the updated title
      description, // Include the updated description
      desired_outcomes: selectedProductOutcomes,
      design_efforts: selectedDesignEfforts,
    };

    const { id: purpose_id } = purpose; // Destructure purpose ID
    try {
      const response = await updatePurpose(
        editedPurpose.title,
        editedPurpose.description,
        purpose_id,
        editedPurpose.desired_outcomes,
        editedPurpose.design_efforts
      );

      if (response.status) {
        toaster("Purpose updated successfully", TOAST_TYPES.SUCCESS);
        fetchData();
        setPurposeToEdit(null);
      } else {
        toaster("Failed to update purpose", TOAST_TYPES.ERROR);
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
      const response = await removePurpose(purpose.id); // Assuming purpose.id is accessible in your props or context

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
      <div className="new-purpose-section w-100">
        <div className="new-purpose-create w-100">
          <div className="mb-24 d-flex align-items-center justify-content-between w-100">
            <h1 className="create-id">{`#pur${
              purpose?.local_id < 10
                ? `00${purpose?.local_id}`
                : purpose?.local_id < 100
                ? `0${purpose?.local_id}`
                : purpose?.local_id
            }`}</h1>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <h2 className="create-name weight-500">Created by:</h2>
                <div className="d-flex align-items-center gap-1">
                  <div className="create_profile">
                    <img
                      src={
                        user.profile_pic || "/assets/images/mark/profile.png"
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
                  <h2 className="create-name">{user?.fullname}</h2>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <h2 className="create-name weight-500">Created on:</h2>
                <h2 className="create-name">
                  {new Date(purpose.created_at).toLocaleDateString()}
                </h2>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="delete-btn mr-12" onClick={handleDeleteClick}>
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
          <div className="d-flex flex-column pb-24 border-bottom-grey">
            <input
              className="title-input mb-24"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="#Title"
            />
            <input
              className="description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief about it"
            />
          </div>
          <div className="ptb-34 border-bottom-grey">
            <div className="d-flex align-items-center gap-4">
              <h1 className="select-outcome-text">Desired outcome(s):</h1>
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
            <ul className="mt-20 d-flex align-items-center gap-4">
              {selectedProductOutcomes.map((effortId) => {
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
            </ul>
          </div>
          <div>
            <div className="d-flex align-items-center gap-4 ptb-34">
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
            <ul className="mt-20 d-flex align-items-center gap-4">
              {selectedDesignEfforts.map((effortId) => (
                <li key={effortId} className="p-0 selectedone">
                  <span className="dot black"></span>
                  {design
                    .flatMap((obj) => obj.items)
                    .map((effort) => {
                      if (effort && effort.id === effortId) {
                        return <span key={effort.id}>{effort.title}</span>;
                      }
                      return null;
                    })}
                </li>
              ))}
            </ul>
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
    </>
  );
};

export default EditPurposeSection;
