import React, { useState } from "react";

const NewPurposeSection = ({
  isAdmin,
  onToggleNewPurpose,
  showNewPurposeInput,
  generateId,
  user,
  getCurrentDate,
  newPurposeTitle,
  setNewPurposeTitle,
  newPurposeDescription,
  setNewPurposeDescription,
  handleSavePurpose,
  toggledesigndropdown,
  selectedProductOutcomes,
  objectives,
  toggleDesignDropdown,
  selectedDesignEfforts,
  design,
  handleButtonClick,
}) => {
  if (!showNewPurposeInput) {
    return null;
  }

  const areAllFieldsFilled = () => {
    return (
      newPurposeTitle.trim() !== "" &&
      newPurposeDescription.trim() !== "" &&
      selectedProductOutcomes.length > 0 &&
      selectedDesignEfforts.length > 0
    );
  };
  const tooltipText = "All info must be filled";
  return (
    <div className="new-purpose-create w-100">
      <div className="responsive-container border_bottom_lavender-blush pb-16 d-flex align-items-center justify-content-between w-100">
        <div className="first-row">
          <h1 className="create-id f-18">{generateId()}</h1>
        </div>
        <div className="d-flex align-items-center gap-3 second-row relative">
          <div className="d-flex align-items-center gap-2 space-adjust-between">
            <div className="d-flex align-items-center gap-2">
              <h2 className="create-name weight-500">Created by:</h2>
              <div className="d-flex align-items-center gap-1">
                <div className="create_profile">
                  <img
                    src={
                      user?.profile_pic
                        ? user?.profile_pic
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
                <h2 className="create-name">{user?.fullname}</h2>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="create-name weight-500">Created on:</h2>
              <h2 className="create-name">{getCurrentDate()}</h2>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 absolute-buttons-group">
            <button className="close_effort_btn" onClick={onToggleNewPurpose}>
              <span>Cancel</span>
            </button>
            <button
              className="save_effort_btn"
              onClick={handleSavePurpose}
              disabled={!areAllFieldsFilled()}
              title={!areAllFieldsFilled() ? tooltipText : ""}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column pt-16 pb-16  border_bottom_lavender-blush">
        <input
          className="title-input mb-24"
          type="text"
          name="title"
          id="title"
          placeholder="#Title"
          value={newPurposeTitle}
          onChange={(e) => setNewPurposeTitle(e.target.value)}
        />
        <input
          className="description-input"
          type="text"
          name="description"
          id="description"
          placeholder="A brief about it"
          value={newPurposeDescription}
          onChange={(e) => setNewPurposeDescription(e.target.value)}
        />
      </div>
      <div className="border_bottom_lavender-blush pt-16 pb-16 d-flex align-items-center gap-3">
        <button
          className="add-project_btn"
          onClick={() => handleButtonClick("outcomes")}
        >
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">Desired outcome(s)</span>
        </button>
        <button
          className="add-project_btn"
          onClick={() => handleButtonClick("design")}
        >
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">Design effort(s)</span>
        </button>
      </div>
      <div className="pt-16">
        <div className="d-flex align-items-start mb-24 gap-35">
          <h1 className="select-outcome-text">Desired outcome(s):</h1>

          <ul
            className=" d-flex align-items-center m-0 flex-wrap p-0"
            style={{ gap: "0 40px" }}
          >
            {selectedProductOutcomes.map((effortId) => {
              const matchingObjective = objectives.find(
                (obj) => obj.id === effortId
              );
              return (
                <li key={effortId} className="p-0 selectedone">
                  {matchingObjective?.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="d-flex align-items-start gap-64">
          <h1 className="select-outcome-text">Design effort(s):</h1>

          <ul
            className=" d-flex align-items-center m-0 flex-wrap p-0"
            style={{ gap: "0 40px" }}
          >
            {selectedDesignEfforts.map((effortId) => (
              <li key={effortId} className="p-0 selectedone">
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
  );
};

export default NewPurposeSection;
