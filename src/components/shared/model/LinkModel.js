import React, { useState } from "react";

const LinkModel = ({
  link,
  setLink,
  addLink,
  showLinkModel,
  setShowLinkModel,
}) => {
  const [error, setError] = useState("");

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    validateLink(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !error) {
      addLink(link);
      setLink("");
      setShowLinkModel(false);
    }
  };

  const validateLink = (url) => {
    // Basic URL validation
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.([a-z]{2,}|[a-z\\d]{2,}))|" + // domain name and extension
        "localhost|" + // localhost
        "\\d{1,3}\\." + // OR IP (v4) address
        "\\d{1,3}\\." +
        "\\d{1,3}\\." +
        "\\d{1,3}|" +
        "\\[?[a-f\\d]*:[a-f\\d:]+\\]?)" + // OR IPv6 address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    if (!urlPattern.test(url)) {
      setError("Invalid URL");
    } else {
      setError("");
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

          <div
            className="icon-container cursor-pointer"
            onClick={handleKeyPress}
          >
            <img
              src={
                link && !error
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
