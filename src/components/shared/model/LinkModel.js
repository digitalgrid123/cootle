import React, { useState } from "react";
import * as yup from "yup";

const LinkModel = ({ link, setLink, addLink, links, setLinks }) => {
  console.log("🚀 ~ LinkModel ~ links:", links);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  // Define the Yup schema for URL validation
  const urlSchema = yup.string().url("Please enter a valid URL.");

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setError(""); // Clear the error when the input changes
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };

  const handleAddLink = async () => {
    if (link.trim()) {
      try {
        await urlSchema.validate(link);
        addLink(link);
        setLink("");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleIconClick = () => {
    handleAddLink();
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue(links[index].link);
  };

  const handleDeleteClick = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSaveEdit = async () => {
    if (editValue.trim()) {
      try {
        await urlSchema.validate(editValue);
        const updatedLinks = links.map((l, i) =>
          i === editIndex ? { ...l, link: editValue } : l
        );
        setLinks(updatedLinks);
        setEditIndex(null);
        setEditValue("");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
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
          onClick={handleIconClick}
        >
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
      {error && <div className="error-message">{error}</div>}
      <div className="links-list">
        {links?.map((link, index) => (
          <div className="link-item" key={index}>
            {editIndex === index ? (
              <div className="edit-mode d-flex align-item-center gap-4">
                <input
                  type="text"
                  value={editValue}
                  className="link-url"
                  onChange={(e) => {
                    setEditValue(e.target.value);
                    setError(""); // Clear the error when the input changes
                  }}
                />
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="close_btn"
                    onClick={() => {
                      setEditIndex(null);
                      setError(""); // Clear the error when closing the edit mode
                    }}
                  >
                    <span>Close</span>
                  </button>
                  <button className="save-btn" onClick={handleSaveEdit}>
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <ul className="m-0" style={{ padding: "0 0 0 12px" }}>
                <li className="p-0">
                  <a
                    className="link-url"
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`Link ${index + 1}`}
                  </a>
                  <div className="link-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(index)}
                    >
                      <img src="/assets/images/mark/edit.svg" alt="edit-btn" />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <img
                        src="/assets/images/mark/trash.svg"
                        alt="delete-btn"
                      />
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LinkModel;
