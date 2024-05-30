import React from "react";
const CompanyLogo = ({ logo, name }) => (
  <div className="company-logo center">
    {logo ? (
      <img className="w-100" src={logo} alt={`${name} Logo`} />
    ) : (
      <h2>{name.charAt(0).toUpperCase()}</h2>
    )}
  </div>
);

export default CompanyLogo;
