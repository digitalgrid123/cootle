"use client";
import React, { useState, useEffect } from "react";
import { getData } from "@/utils/storage";
import Title from "@/components/Dashboard/Title";
import { USER_ROLES } from "@/constants/keywords";
import { useSearchParams, useRouter } from "next/navigation";
import Purpose from "@/components/Dashboard/project/purpose/Purpose";
import Effort from "@/components/Dashboard/project/efforts/Effort";
import Insight from "@/components/Dashboard/project/insight/insight";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedMapping, setSelectedMapping] = useState(
    searchParams.get("tab") || "purpose"
  );
  const [showNewPurposeInput, setShowNewPurposeInput] = useState(false);
  const [showNewEffortInput, setShowNewEffortInput] = useState(false);

  const name = searchParams.get("name");
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab) {
      setSelectedMapping(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setSelectedMapping(tab);
    router.push(`?name=${name}&tab=${tab}`, undefined, { shallow: true });
  };

  const handleToggleNewPurpose = () => {
    setShowNewPurposeInput((prevState) => !prevState);
  };
  const handleToggleNewEffort = () => {
    setShowNewEffortInput((prevState) => !prevState);
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
          <Effort
            isAdmin={isAdmin}
            showNewEffortInput={showNewEffortInput}
            onToggleNewEffort={handleToggleNewEffort}
          />
        );
      case "insight":
        return <Insight />;
      default:
        return <div />;
    }
  };

  const renderAdminButton = () => {
    if (selectedMapping === "purpose") {
      return (
        <div
          className="relative d-flex align-items-center gap-3 cursor-pointer"
          onClick={handleToggleNewPurpose}
        >
          <img src="/assets/images/mark/second-plus.svg" alt="plus-icon" />
          <h2 className="add-purpose">New purpose</h2>
        </div>
      );
    }

    if (selectedMapping === "efforts") {
      return (
        <div
          className="relative d-flex align-items-center gap-3 cursor-pointer"
          onClick={handleToggleNewEffort}
        >
          <img src="/assets/images/mark/second-plus.svg" alt="plus-icon" />
          <h2 className="add-purpose">New effort</h2>
        </div>
      );
    }

    return <div />;
  };

  return (
    <div className="h-100 d-flex flex-column">
      <Header
        title={name}
        selectedMapping={selectedMapping}
        setSelectedMapping={handleTabChange}
        renderAdminButton={renderAdminButton}
      />
      <div className="box-content">{renderContent()}</div>
    </div>
  );
};

const Header = ({
  title,
  selectedMapping,
  setSelectedMapping,
  renderAdminButton,
}) => (
  <div className="d-flex align-items-center justify-content-between mb-3">
    <Title title={title} />
    <div className="button-group">
      {["purpose", "efforts", "insight"].map((mapping) => (
        <button
          key={mapping}
          className={`mapping_btn weight-400 ${
            selectedMapping === mapping ? "active" : ""
          }`}
          onClick={() => setSelectedMapping(mapping)}
        >
          {mapping.charAt(0).toUpperCase() + mapping.slice(1)}
        </button>
      ))}
    </div>
    {renderAdminButton()}
  </div>
);

export default Page;
