import React, { useState } from "react";

const LinkModel = ({
  link,
  setLink,
  addLink,
  showLinkModel,
  setShowLinkModel,
}) => {
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const closedmodel = () => {
    addLink(link);
    setShowLinkModel(false);
    setLink("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !error) {
      addLink(link);
      setLink("");
      setShowLinkModel(false);
    }
  };

  return (
    showLinkModel && (
      <div className="link-model">
        <div className="input-container">
          <input
            type="text"
            value={link}
            onChange={handleLinkChange}
            onKeyPress={handleKeyPress}
            className="input-field"
            required
            autoFocus
          />

          <div className="icon-container cursor-pointer" onClick={closedmodel}>
            <img
              src={
                link
                  ? "/assets/images/mark/activelink.svg"
                  : "/assets/images/mark/inactivelink.svg"
              }
              alt="link icon"
              className="link-icon"
            />
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" className="polygon">
          <polygon points="20,20 10,0 0,20" fill="black" />
        </svg>
      </div>
    )
  );
};

export default LinkModel;
