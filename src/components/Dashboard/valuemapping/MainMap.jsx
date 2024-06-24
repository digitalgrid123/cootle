import React, { useState } from "react";
import Title from "../Title";
import EffortMapping from "./EffortMapping";
import ObjectiveMapping from "./ObjectiveMapping";
import ValueMapping from "./ValueMapping";
import { useGlobalCompany } from "@/utils/globalState";
import ProductOutcomes from "./ProductOutcomes";
import { useAuth, useToaster } from "@/hooks";
import { TOAST_ALERTS, TOAST_TYPES, USER_ROLES } from "@/constants/keywords";
import { getData } from "@/utils/storage";

const MainMap = () => {
  const [selectedMapping, setSelectedMapping] = useState("effort");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [reset, setreset] = useState();
  const { toaster } = useToaster();
  const { resetmapping } = useAuth();
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  const restAddButton = async () => {
    try {
      const res = await resetmapping();

      if (!res.status) {
        return toaster("Failed to Reset", TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster("Successfully Reset", TOAST_TYPES.SUCCESS);
        setreset(true);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
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
          />
        );
      case "VAL":
        return (
          <ValueMapping
            selectedMapping={selectedMapping}
            reset={reset}
            isAdmin={isAdmin}
          />
        );
      case "OUT":
        return (
          <ProductOutcomes
            selectedMapping={selectedMapping}
            reset={reset}
            isAdmin={isAdmin}
          />
        );
      default:
        return null;
    }
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <div className="h-100 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Title title="Value mapping" />
          <div className="button-group">
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "effort" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("effort")}
            >
              Effort Mapping
            </button>
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "OBJ" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("OBJ")}
            >
              Objective Mapping
            </button>
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "VAL" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("VAL")}
            >
              Value Mapping
            </button>
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "OUT" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("OUT")}
            >
              Product Mapping
            </button>
          </div>

          <div className="relative">
            {isAdmin && (
              <button className="reset_btn" onClick={handleDropdown}>
                <img src="/assets/images/mark/dot.svg" alt="dot-icon" />
              </button>
            )}
            {openDropdown && (
              <ul className="reset-dropdown d-flex gap-2 flex-column">
                <h2 className="account_text border_bottom_bluish weight-500">
                  Action
                </h2>
                <div className="reset-profile d-flex align-items-center justify-content-between w-100">
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
              </ul>
            )}
          </div>
        </div>

        <div className="box-content">{renderContent()}</div>
      </div>
    </>
  );
};

export default MainMap;
