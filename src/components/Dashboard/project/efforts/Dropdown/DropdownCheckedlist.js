import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useRef, useState, useEffect } from "react";

const status = {
  YBC: "Yet to be checked",
  UCH: "Unchecked", // This will be filtered out from the dropdown options
  REA: "Value Realised",
  VUR: "Value Unrealised",
  UPA: "Unplanned Activity",
};
const statusDescriptions = {
  YBC: "Yet to be checked",
  UCH: "Unchecked", // This will be filtered out from the dropdown options
  REA: "value Realised",
  VUR: "value Unrealised",
  UPA: "Unplanned activity",
};

const DropdownCheckedlist = ({
  effort,
  getStatusStyles,
  getStatusImage,
  fetchEffortData,
  user,
}) => {
  const { effortcheckedBy } = useAuth();
  const { toaster } = useToaster();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(effort?.value_status);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusSelect = async (status) => {
    try {
      const result = await effortcheckedBy(effort.id, status);

      if (result.status) {
        setSelectedStatus(status);
        setIsOpen(false);
        fetchEffortData();
        toaster("Effort status updated successfully", TOAST_TYPES.SUCCESS);
      } else {
        toaster("Failed to update effort status", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getStyledDescription = (description) => {
    const weight600Keywords = ["Unplanned", "Realised", "Unrealised"];
    const words = description.split(" ");
    return words.map((word, index) => {
      const isWeight600 = weight600Keywords.some((keyword) =>
        word.includes(keyword)
      );
      const className = isWeight600 ? "weight-600" : "weight-500";
      return (
        <span key={index} className={className}>
          {word}
          {index < words.length - 1 && " "}
        </span>
      );
    });
  };

  const filteredStatusKeys = Object.keys(statusDescriptions).filter(
    (statusKey) => statusKey !== "UCH" && statusKey !== "YBC"
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="DropdownCheckedlist-wrapper relative">
      <div
        className="DropdownCheckedlist-header d-flex align-items-center gap-2 cursor-pointer"
        style={getStatusStyles(effort?.value_status)}
        onClick={() => {
          if (effort.user !== user?.id && selectedStatus !== "UCH") {
            toggleDropdown();
          }
        }}
      >
        <span className="checked-status text-align-center">
          {status[selectedStatus]}
        </span>
        {effort.user !== user?.id &&
          getStatusImage() &&
          effort?.value_status !== "UCH" && (
            <img
              src={getStatusImage()}
              alt={statusDescriptions[selectedStatus]}
            />
          )}
      </div>
      {isOpen && effort.user !== user?.id && selectedStatus !== "UCH" && (
        <ul className="DropdownCheckedlist-menu">
          {filteredStatusKeys.map((statusKey, index) => (
            <li
              key={statusKey}
              onClick={() => handleStatusSelect(statusKey)}
              className={`cursor-pointer mb-8 ${
                index === filteredStatusKeys.length - 1
                  ? "p-0"
                  : "padding-thirtytwo"
              } ${selectedStatus === statusKey ? "active" : ""}`}
            >
              {getStyledDescription(statusDescriptions[statusKey])}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownCheckedlist;
