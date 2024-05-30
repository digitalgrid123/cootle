import React from "react";
import CompanyLogo from "./CompanyLogo";

const CompanyListItem = ({ company, onClick, isSelected }) => (
  <li
    className={`dropdown-list d-flex align-items-center justify-content-start gap-2 cursor-pointer ${
      isSelected ? "selected" : ""
    }`}
    onClick={() => onClick(company)}
  >
    {company?.logo ? (
      <div className="company_logo_dropdown">
        <img
          className="w-100"
          src={company.logo}
          alt={`${company.name} Logo`}
        />
      </div>
    ) : (
      <div className="company_dropdown_logo center">
        <h2>{company.name.charAt(0).toUpperCase()}</h2>
      </div>
    )}
    <h4 className="company-dropdown-name">{company.name}</h4>
  </li>
);

export default CompanyListItem;
