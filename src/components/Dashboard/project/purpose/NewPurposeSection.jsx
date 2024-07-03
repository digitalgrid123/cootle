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
}) => {
  if (!isAdmin || !showNewPurposeInput) {
    return null;
  }

  return (
    <div className="new-purpose-section w-100">
      <div className="new-purpose-create w-100">
        <div className="mb-24 d-flex align-items-center justify-content-between w-100">
          <h1 className="create-id">{generateId()}</h1>
          <div className="d-flex align-items-center gap-2">
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
          <div className="d-flex align-items-center gap-2">
            <button className="close_effort_btn" onClick={onToggleNewPurpose}>
              <span>Cancel</span>
            </button>
            <button className="save_effort_btn" onClick={handleSavePurpose}>
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="d-flex flex-column pb-24 border-bottom-grey">
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
  );
};

export default NewPurposeSection;
