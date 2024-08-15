import { useAuth, useToaster } from "@/hooks";
import { TOAST_TYPES } from "@/constants/keywords";
import React, { useEffect, useRef, useState } from "react";

const ArchievedModel = ({
  dropdownOpen,
  toggleDropdown,
  archivedObjectives,
  fetchObjectives,
  title,
}) => {
  const dropdownRef = useRef(null);
  const { unarchiveObjective } = useAuth();
  const { toaster } = useToaster();

  const closeDropdown = () => {
    toggleDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const handleUnarchive = async (objectiveId) => {
    try {
      const res = await unarchiveObjective(objectiveId);

      if (!res.status) {
        toaster("Failed to unarchive objective", TOAST_TYPES.ERROR);
      } else {
        fetchObjectives();
        toaster("Objective unarchived successfully", TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      console.error("Error unarchiving objective:", error);
      toaster("Something went wrong while unarchiving", TOAST_TYPES.ERROR);
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

  return (
    <div>
      {dropdownOpen && (
        <div className="invitation-overlay p-80">
          <div className="invitation-content h-100" ref={dropdownRef}>
            <div className="effort-container w-100 h-100">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h2 className="category-heading weight-600 mb-24">{title}</h2>
                <button
                  className="close_effort_btn"
                  onClick={closeDropdown}
                  aria-label="Close dropdown"
                >
                  <span>close</span>
                </button>
              </div>
              <div className="archived-objectives-list ptb-34 overflow-scroll-y ">
                {archivedObjectives.length > 0 ? (
                  archivedObjectives.map((obj) => (
                    <div
                      key={obj.id}
                      className="archived-objective-item  border_bottom_faint pb-20 d-flex align-items-center justify-content-between pt-24"
                    >
                      <h3 className="menutext weight-500 m-0">{obj.title}</h3>

                      <button
                        type="button"
                        className="unarchive-btn"
                        onClick={() => handleUnarchive(obj.id)}
                      >
                        <img
                          src="/assets/images/mark/unarchive.svg"
                          alt="unarchieve-icon"
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchievedModel;
