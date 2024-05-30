import React, { useState } from "react";
import Title from "../Title";
import EffortMapping from "./EffortMapping";

const MainMap = () => {
  const [selectedMapping, setSelectedMapping] = useState("effort");
  const [openDropdown, setOpenDropdown] = useState(false);

  const renderContent = () => {
    switch (selectedMapping) {
      case "effort":
        return <EffortMapping />;
      case "objective":
        return <div>Content of Objective Mapping</div>;
      case "value":
        return <div>Content of Value Mapping</div>;
      case "product":
        return <div>Content of Product Mapping</div>;
      default:
        return <div>Content of Effort Mapping</div>;
    }
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <div className="h-100">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ marginBottom: "18px" }}
        >
          <Title title="Value mapping" />
          <div className="button-group">
            <button
              className={`mapping_btn ${
                selectedMapping === "effort" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("effort")}
            >
              Effort Mapping
            </button>
            <button
              className={`mapping_btn ${
                selectedMapping === "objective" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("objective")}
            >
              Objective Mapping
            </button>
            <button
              className={`mapping_btn ${
                selectedMapping === "value" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("value")}
            >
              Value Mapping
            </button>
            <button
              className={`mapping_btn ${
                selectedMapping === "product" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("product")}
            >
              Product Mapping
            </button>
          </div>

          <div className="relative">
            <button className="reset_btn" onClick={handleDropdown}>
              <img src="/assets/images/mark/dot.svg" alt="dot-icon" />
            </button>
            {openDropdown && (
              <ul className="reset-dropdown d-flex gap-2 flex-column">
                <h2 className="account_text">Action</h2>
                <div className="reset-profile d-flex align-items-center justify-content-between w-100">
                  <div className="profile-setting_container">
                    <img
                      src="/assets/images/mark/setting_profile.svg"
                      alt="profile-settings"
                    />
                    <h4 className="cursor-pointer">Reset Mapping</h4>
                  </div>
                </div>
              </ul>
            )}
          </div>
        </div>

        <div className="invitation-content" style={{ height: "90%" }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default MainMap;
