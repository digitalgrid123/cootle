import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useState } from "react";

const DropdownCheckedlist = ({
  effort,
  getStatusStyles,
  getStatusImage,
  statusDescriptions,
  isAdmin,
  fetchEffortData,
  fetchMemberData,
}) => {
  const { effortcheckedBy } = useAuth();
  const { toaster } = useToaster(); // Add toaster from useToaster
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(effort?.value_status);

  const toggleDropdown = () => {
    if (isAdmin) {
      return; // Do not open dropdown if isAdmin is true
    }
    setIsOpen(!isOpen);
  };

  const handleStatusSelect = async (status) => {
    try {
      const result = await effortcheckedBy(effort.id, status);

      if (result.status) {
        setSelectedStatus(status);
        setIsOpen(false);
        fetchEffortData();
        fetchMemberData();
        toaster("Effort added successfully", TOAST_TYPES.SUCCESS);
      } else {
        toaster("Failed to add effort", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div className="DropdownCheckedlist-wrapper">
      <div
        className="DropdownCheckedlist-header d-flex align-items-center gap-1 cursor-pointer"
        style={getStatusStyles(effort?.value_status)}
        onClick={toggleDropdown}
      >
        <span className="checked-status">
          {statusDescriptions[selectedStatus]}
        </span>
        {!isAdmin && (
          <span>
            {getStatusImage() && (
              <img
                src={getStatusImage()}
                alt={statusDescriptions[selectedStatus]}
              />
            )}
          </span>
        )}
      </div>
      {isOpen && (
        <ul className="DropdownCheckedlist-menu">
          {Object.keys(statusDescriptions).map((statusKey) => (
            <li
              key={statusKey}
              onClick={() => handleStatusSelect(statusKey)}
              className={`cursor-pointer mb-8 ${
                selectedStatus === statusKey ? "active" : ""
              }`}
            >
              {statusDescriptions[statusKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownCheckedlist;
