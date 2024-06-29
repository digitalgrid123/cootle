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
  if (!isAdmin || !showNewEffortInput) {
    return null;
  }

  const addLink = (url) => {
    setLinks((prevLinks) => [...prevLinks, { url }]);
  };

  return (
    <div className="col-lg-6">
      <div className="new-purpose-section w-100 mb-24">
        <div className="new-purpose-create w-100">
          <div className="mb-24 d-flex align-items-center justify-content-between w-100">
            <h1 className="create-id">{generateId()}</h1>
            <div className="d-flex align-items-center gap-2">
              <button className="close_effort_btn" onClick={onToggleNewEffort}>
                <span>Cancel</span>
              </button>
              <button className="save_effort_btn" onClick={handleSaveEffort}>
                <span>Save</span>
              </button>
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
                      objectFit: "cover",
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
                <div className="show-selectedone selectedone">
                  <li key={selectedPurpose} className="p-0 ">
                    <span className="dot black"></span>
                    {purpose.find((p) => p.id === selectedPurpose)?.title}
                  </li>
                </div>
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
    </div>
  );
};

export default NewEffortSection;
