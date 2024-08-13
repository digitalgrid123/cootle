import LinkModel from "@/components/shared/model/LinkModel";
import PurposeList from "@/components/shared/model/PurposeList";
import React, { useState } from "react";

const NewEffortSection = ({
  isAdmin,
  onToggleNewEffort,
  showNewEffortInput,
  generateId,
  user,
  handleButtonClick,
  handleSaveEffort,
  toggledesigndropdown,
  selectedProductOutcomes,
  objectives,
  toggleDesignDropdown,
  selectedDesignEfforts,
  design,
  selectedPurpose,
  togglePurposeDropdown,
  purpose,
  setLink,
  link,
  setLinks,
  links,
}) => {
  if (!showNewEffortInput) {
    return null;
  }

  const addLink = (url) => {
    setLinks((prevLinks) => [...prevLinks, { url }]);
  };
  const handleCancel = () => {
    setLink(""); // Clear the link state
    onToggleNewEffort(); // Toggle the new effort input
  };

  return (
    <div className="new-effort-create w-100">
      <div className="pb-16 border_bottom_lavender-blush d-flex align-items-center justify-content-between w-100">
        <h1 className="create-id f-16">{generateId()}</h1>
        <div className="d-flex align-items-center gap-2">
          <button className="close_effort_btn" onClick={handleCancel}>
            <span>Cancel</span>
          </button>
          <button className="save_effort_btn" onClick={handleSaveEffort}>
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 pt-16 pb-16 border_bottom_lavender-blush">
        <h2 className="create-name weight-500">By:</h2>
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
        <div className="d-flex align-items-start mb-24 gap-3">
          <h1 className="select-outcome-text w-20">Effort type:</h1>

          <ul className=" d-flex align-items-center m-0 w-80 p-0 ">
            {selectedDesignEfforts?.map((effortId) => (
              <div className="show-selectedone selectedone">
                <li key={effortId} className="p-0  ">
                  {design
                    .flatMap((obj) => obj.items)
                    .map((effort) => {
                      if (effort && effort.id === effortId) {
                        return <span key={effort.id}>{effort.title}</span>;
                      }
                      return null;
                    })}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="d-flex align-items-start mb-24 gap-3">
          <h1 className="select-outcome-text w-20">Outcome:</h1>

          <ul
            className=" d-flex align-items-center m-0 flex-wrap w-80 p-0"
            style={{ gap: "0 40px" }}
          >
            {selectedProductOutcomes?.map((effortId) => {
              const matchingObjective = objectives.find(
                (obj) => obj.id === effortId
              );
              return (
                <div className="selectedone show-selectedone p-0 ">
                  <li key={effortId} className="p-0 ">
                    {matchingObjective?.title}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className=" d-flex align-items-start mb-24 gap-3">
          <h1 className="select-outcome-text w-20">Purpose:</h1>

          <ul className=" d-flex align-items-center gap-4 m-0 w-80 p-0">
            {selectedPurpose && (
              <div className="show-selectedone selectedone p-0">
                <li key={selectedPurpose} className="p-0 ">
                  {purpose.find((p) => p.id === selectedPurpose)?.title}
                </li>
              </div>
            )}
          </ul>
        </div>

        {/* <LinkModel link={link} setLink={setLink} addLink={addLink} /> */}
        <div className="d-flex align-items-center mb-24 gap-3">
          <h1 className="select-outcome-text w-20">Links:</h1>

          <ul
            className="d-flex flex-wrap align-items-center m-0 w-80 p-0"
            style={{ gap: "0 40px" }}
          >
            {links?.map((link, index) => (
              <div className="show-selectedone selectedone">
                <li key={index} className="p-0 ">
                  <a
                    style={{ textDecoration: "underline" }}
                    className="selectedone"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`Link ${index + 1}`}
                  </a>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewEffortSection;
