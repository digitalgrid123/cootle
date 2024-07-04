import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useState } from "react";

const statusDescriptions = {
  YBC: "Yet to be checked",
  UCH: "Unchecked", // This will be filtered out from the dropdown options
  UPA: "Unplanned Activity",
  REA: "Value Realised",
  VUR: " Unrealised",
};

const DropdownCheckedlist = ({
  effort,
  getStatusStyles,
  getStatusImage,
  fetchEffortData,
  fetchMemberData,
  user,
}) => {
  const { effortcheckedBy } = useAuth();
  const { toaster } = useToaster();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(effort?.value_status);

  const toggleDropdown = () => {
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
        onClick={() => {
          if (effort.user === user?.id) {
            return; // Do nothing if effort user matches current user
          }
          toggleDropdown(); // Toggle dropdown if effort user does not match current user
        }}
      >
        <span className="checked-status">
          {statusDescriptions[selectedStatus]}
        </span>
        {effort.user !== user?.id && (
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
      {isOpen && effort.user !== user?.id && (
        <ul className="DropdownCheckedlist-menu">
          {Object.keys(statusDescriptions)
            .filter((statusKey) => statusKey !== "UCH") // Filter out 'UCH'
            .map((statusKey) => (
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
