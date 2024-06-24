"use client";
import React, { useState } from "react";
import { getData } from "@/utils/storage";
import Title from "@/components/Dashboard/Title";
import ObjectiveMapping from "@/components/Dashboard/valuemapping/ObjectiveMapping";
import ValueMapping from "@/components/Dashboard/valuemapping/ValueMapping";
import { USER_ROLES } from "@/constants/keywords";
import { useSearchParams } from "next/navigation";
import Purpose from "@/components/Dashboard/project/Purpose";

const Page = () => {
  const [selectedMapping, setSelectedMapping] = useState("purpose");
  const [showNewPurposeInput, setShowNewPurposeInput] = useState(false); // State to manage visibility of new purpose input
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  const handleToggleNewPurpose = () => {
    setShowNewPurposeInput((prevState) => !prevState);
  };

  const renderContent = () => {
    switch (selectedMapping) {
      case "purpose":
        return (
          <Purpose
            isAdmin={isAdmin}
            showNewPurposeInput={showNewPurposeInput}
            onToggleNewPurpose={handleToggleNewPurpose}
          />
        );
      case "efforts":
        return (
          <ObjectiveMapping
            selectedMapping={selectedMapping}
            isAdmin={isAdmin}
          />
        );
      case "insight":
        return (
          <ValueMapping selectedMapping={selectedMapping} isAdmin={isAdmin} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="h-100 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Title title={name} />
          <div className="button-group">
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "purpose" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("purpose")}
            >
              Purpose
            </button>
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "efforts" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("efforts")}
            >
              Efforts
            </button>
            <button
              className={`mapping_btn weight-400 ${
                selectedMapping === "insight" ? "active" : ""
              }`}
              onClick={() => setSelectedMapping("insight")}
            >
              Insight
            </button>
          </div>
          {isAdmin && (
            <div
              className="relative d-flex align-items-center gap-3 cursor-pointer"
              onClick={handleToggleNewPurpose}
            >
              <img
                src="/assets/images/mark/second-plus.svg"
                alt="plus-icon"
                srcset=""
              />
              <h2 className="add-purpose">New purpose</h2>
            </div>
          )}
        </div>

        <div className="box-content">{renderContent()}</div>
      </div>
    </>
  );
};

export default Page;
