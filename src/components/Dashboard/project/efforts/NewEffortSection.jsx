import LinkModel from "@/components/shared/model/LinkModel";
import PurposeList from "@/components/shared/model/PurposeList";
import React, { useState } from "react";

const NewEffortSection = ({
  isAdmin,
  onToggleNewEffort,
  showNewEffortInput,
  generateId,
  user,

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
  const [showLinkModel, setShowLinkModel] = useState(false);

  const tooglelinkmodel = () => {
    setShowLinkModel((prev) => !prev);
  };
  if (!showNewEffortInput) {
    return null;
  }

  const addLink = (url) => {
    setLinks((prevLinks) => [...prevLinks, { url }]);
  };
  const handleCancel = () => {
    setLink(""); // Clear the link state
    onToggleNewEffort(); // Toggle the new effort input
    setShowLinkModel(false);
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
          onClick={() => toggleDesignDropdown(true)}
        >
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">Effort type</span>
        </button>
        <button
          className="add-project_btn"
          onClick={() => toggledesigndropdown(true)}
        >
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">Outcome</span>
        </button>
        <button
          className="add-project_btn"
          onClick={() => togglePurposeDropdown(true)}
        >
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">purpose</span>
        </button>
        <button className="add-project_btn" onClick={tooglelinkmodel}>
          <img src="/assets/images/mark/addoutcomesbtn.svg" alt="add-btn" />
          <span className="add-text">Links</span>
        </button>
      </div>
      <div className="pt-16">
        <div className="d-flex align-items-start mb-24">
          <div className="col-lg-2">
            <h1 className="select-outcome-text">Effort type:</h1>
          </div>
          <ul className=" d-flex align-items-center m-0">
            {selectedDesignEfforts?.map((effortId) => (
              <div className="show-selectedone selectedone">
                <li key={effortId} className="p-0  ">
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
              </div>
            ))}
          </ul>
          <div className="col-lg-10"></div>
        </div>
        <div className="d-flex align-items-start mb-24">
          <div className="col-lg-2">
            <h1 className="select-outcome-text">Outcome:</h1>
          </div>
          <div className="col-lg-10">
            <ul className="mt-20 d-flex align-items-center m-0">
              {selectedProductOutcomes?.map((effortId) => {
                const matchingObjective = objectives.find(
                  (obj) => obj.id === effortId
                );
                return (
                  <div className="selectedone show-selectedone ">
                    <li key={effortId} className="p-0 ">
                      <span className="dot black"></span>
                      {matchingObjective?.title}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>

        <div className=" d-flex align-items-start mb-24">
          <div className="col-lg-2">
            <h1 className="select-outcome-text">Purpose:</h1>
          </div>
          <div className="col-lg-10">
            <ul className="mt-20 d-flex align-items-center gap-4 m-0">
              {selectedPurpose && (
                <div className="show-selectedone selectedone">
                  <li key={selectedPurpose} className="p-0 ">
                    <span className="dot black"></span>
                    {purpose.find((p) => p.id === selectedPurpose)?.title}
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="">
          <LinkModel
            showLinkModel={showLinkModel}
            link={link}
            setLink={setLink}
            addLink={addLink}
            setShowLinkModel={setShowLinkModel}
          />
          <div className="d-flex align-items-center mb-24">
            <h1 className="select-outcome-text">Links:</h1>

            <ul className="d-flex flex-wrap align-items-center m-0 gap-2 flex-wrap">
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
    </div>
  );
};

export default NewEffortSection;
