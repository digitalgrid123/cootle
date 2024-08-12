import { useAuth, useToaster } from "@/hooks";
import { TOAST_TYPES } from "@/constants/keywords";
import React, { useEffect, useRef, useState } from "react";

const ArchivedEffortsModal = ({
  dropdownOpen,
  toggleDropdown,
  archivedDesignEfforts,
  refreshEfforts,
  title,
}) => {
  const dropdownRef = useRef(null);
  const { effortunarchieve } = useAuth();
  const { toaster } = useToaster();

  const closeDropdown = () => {
    toggleDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const handleUnarchive = async (effortId) => {
    try {
      const res = await effortunarchieve(effortId);

      if (!res.status) {
        toaster("Failed to unarchive design effort", TOAST_TYPES.ERROR);
      } else {
        refreshEfforts();
        toaster("Design effort unarchived successfully", TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      console.error("Error unarchiving design effort:", error);
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
  useEffect(() => {
    if (dropdownOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
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
              <div className="archived-efforts-list ptb-34 overflow-scroll ">
                {archivedDesignEfforts.length > 0 ? (
                  archivedDesignEfforts.map((effort) => (
                    <div
                      key={effort.id}
                      className="archived-effort-item border_bottom_faint pb-20 d-flex align-items-center justify-content-between pt-24"
                    >
                      <h3 className="menutext weight-500 m-0">
                        {effort.title}
                      </h3>

                      <button
                        type="button"
                        className="unarchive-btn"
                        onClick={() => handleUnarchive(effort.id)}
                      >
                        <img
                          src="/assets/images/mark/unarchive.svg"
                          alt="unarchive-icon"
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No archived design efforts found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivedEffortsModal;
