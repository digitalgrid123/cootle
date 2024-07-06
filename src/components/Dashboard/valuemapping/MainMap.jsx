// MainMap.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import Title from "../Title";
import EffortMapping from "./EffortMapping";
import ObjectiveMapping from "./ObjectiveMapping";
import ValueMapping from "./ValueMapping";
import ProductOutcomes from "./ProductOutcomes";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES, USER_ROLES } from "@/constants/keywords";
import { getData } from "@/utils/storage";

const MainMap = () => {
  const [selectedMapping, setSelectedMapping] = useState("effort");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [reset, setReset] = useState(false);
  const { toaster } = useToaster();
  const { resetmapping } = useAuth();
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);
  const [archieveddropdownOpen, setArchievedDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const togglearchievedDropdown = useCallback(
    () => setArchievedDropdownOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    // Handle initial selection based on URL or any other initial logic
    const initialMapping = getInitialMappingFromURL();
    setSelectedMapping(initialMapping);
  }, []);

  const getInitialMappingFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("mapping") || "effort"; // Default to 'effort' if not provided
  };

  const restAddButton = async () => {
    try {
      const res = await resetmapping();

      if (!res.status) {
        toaster("Failed to Reset", TOAST_TYPES.ERROR);
      } else {
        toaster("Successfully Reset", TOAST_TYPES.SUCCESS);
        setReset(true);
        setOpenDropdown(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleMappingChange = (mapping) => {
    setSelectedMapping(mapping);
    setReset(false); // Reset state when changing mapping
    updateURLWithMapping(mapping); // Update URL with selected mapping
  };

  const updateURLWithMapping = (mapping) => {
    const url = new URL(window.location.href);
    url.searchParams.set("mapping", mapping);
    window.history.pushState({ path: url.href }, "", url.href);
  };

  const renderContent = () => {
    switch (selectedMapping) {
      case "effort":
        return <EffortMapping reset={reset} isAdmin={isAdmin} />;
      case "OBJ":
        return (
          <ObjectiveMapping
            selectedMapping={selectedMapping}
            reset={reset}
            isAdmin={isAdmin}
            togglearchievedDropdown={togglearchievedDropdown}
            archieveddropdownOpen={archieveddropdownOpen}
          />
        );
      case "VAL":
        return (
          <ValueMapping
            selectedMapping={selectedMapping}
            reset={reset}
            isAdmin={isAdmin}
            togglearchievedDropdown={togglearchievedDropdown}
            archieveddropdownOpen={archieveddropdownOpen}
          />
        );
      case "OUT":
        return (
          <ProductOutcomes
            selectedMapping={selectedMapping}
            reset={reset}
            isAdmin={isAdmin}
            togglearchievedDropdown={togglearchievedDropdown}
            archieveddropdownOpen={archieveddropdownOpen}
          />
        );
      default:
        return null;
    }
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      handleDropdown();
    }
  };

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Title title="Value mapping" />
        <div className="button-group">
          <button
            className={`mapping_btn weight-400 ${
              selectedMapping === "effort" ? "active" : ""
            }`}
            onClick={() => handleMappingChange("effort")}
          >
            Effort Mapping
          </button>
          <button
            className={`mapping_btn weight-400 ${
              selectedMapping === "OBJ" ? "active" : ""
            }`}
            onClick={() => handleMappingChange("OBJ")}
          >
            Objective Mapping
          </button>
          <button
            className={`mapping_btn weight-400 ${
              selectedMapping === "VAL" ? "active" : ""
            }`}
            onClick={() => handleMappingChange("VAL")}
          >
            Value Mapping
          </button>
          <button
            className={`mapping_btn weight-400 ${
              selectedMapping === "OUT" ? "active" : ""
            }`}
            onClick={() => handleMappingChange("OUT")}
          >
            Product Outcome
          </button>
        </div>

        <div className="relative">
          {isAdmin && (
            <button className="reset_btn" onClick={handleDropdown}>
              <img src="/assets/images/mark/dot.svg" alt="dot-icon" />
            </button>
          )}
          {openDropdown && (
            <ul
              className="reset-dropdown d-flex gap-2 flex-column"
              ref={dropdownRef}
            >
              <h2 className="account_text border_bottom_bluish weight-500">
                Action
              </h2>
              <div className="reset-profile d-flex align-items-center justify-content-between w-100  border_bottom_bluish">
                <div
                  className="profile-setting_container cursor-pointer"
                  onClick={restAddButton}
                >
                  <img
                    src="/assets/images/mark/setting_profile.svg"
                    alt="profile-settings"
                  />
                  <h4 className="cursor-pointer weight-500">Reset Mapping</h4>
                </div>
              </div>
              <div className="reset-profile d-flex align-items-center justify-content-between w-100">
                <div
                  className="profile-setting_container cursor-pointer"
                  onClick={togglearchievedDropdown}
                >
                  <img
                    style={{ width: "32px" }}
                    src="/assets/images/mark/archieve.png"
                    alt="profile-settings"
                  />
                  <h4 className="cursor-pointer weight-500">Archieved</h4>
                </div>
              </div>
            </ul>
          )}
        </div>
      </div>

      <div className="box-content">{renderContent()}</div>
    </div>
  );
};

export default MainMap;
