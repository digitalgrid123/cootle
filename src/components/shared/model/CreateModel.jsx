import { useAuth, useToaster } from "@/hooks";
import { TOAST_TYPES } from "@/constants/keywords";
import React, { useEffect, useRef, useState } from "react";
import { toggleBodyScroll } from "@/utils/scrollUtils";

const CreateModel = ({
  dropdownOpen,
  toggleDropdown,
  selectedMapping,
  onModelAdded,
  title,
}) => {
  const dropdownRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createmapping } = useAuth();
  const { toaster } = useToaster();

  const closeDropdown = () => {
    toggleDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const handleAdd = async () => {
    try {
      const res = await createmapping(name, description, selectedMapping);

      if (!res.status) {
        toaster("Failed to add", TOAST_TYPES.ERROR);
      } else {
        toaster("Added successfully", TOAST_TYPES.SUCCESS);
        closeDropdown(); // Close dropdown upon success
        if (onModelAdded) {
          onModelAdded(); // Trigger callback to parent component
        }
      }
    } catch (error) {
      console.error("Error adding model:", error);
      toaster("Something went wrong while adding", TOAST_TYPES.ERROR);
    } finally {
      setName("");
      setDescription("");
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    toggleBodyScroll(dropdownOpen);
  }, [dropdownOpen]);

  return (
    <div>
      {dropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content h-100" ref={dropdownRef}>
            <div className="effort-container w-100 h-100">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h2 className="category-heading weight-600 mb-24">{title}</h2>
                <div className="d-flex align-item-center gap-2">
                  <button
                    className="close_effort_btn"
                    onClick={closeDropdown}
                    aria-label="Close dropdown"
                  >
                    <span>Close</span>
                  </button>
                  <button
                    type="button"
                    className="save_effort_btn"
                    onClick={handleAdd}
                    disabled={name.trim() === ""}
                  >
                    <span>Save</span>
                  </button>
                </div>
              </div>
              <form className="h-100 d-flex flex-column ">
                <div className="form-group mb-32">
                  <label
                    htmlFor="nameInput"
                    className="label-effort weight-600 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-40"
                    id="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className="form-group d-flex flex-column "
                  style={{ flex: "1 1" }}
                >
                  <label
                    htmlFor="descriptionInput"
                    className="label-effort weight-600 "
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control "
                    id="descriptionInput "
                    rows="3"
                    style={{ flex: "1 1" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModel;
