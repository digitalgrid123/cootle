import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {
  LOGOUT_KEY,
  NAV_CONFIG_BOTTOM,
  NAV_CONFIG,
} from "@/constants/attributes";
import { useAuth } from "@/hooks";
import { USER_ROLES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";

const CompanyListItem = ({ company, onClick, isSelected }) => (
  <li
    className={`dropdown-list d-flex align-items-center justify-content-start gap-2 cursor-pointer ${
      isSelected ? "selected" : ""
    }`}
    onClick={() => onClick(company)}
  >
    <div className="company-dropdown-logo center">
      {company.logo ? (
        <img src={company.logo} alt={`${company.name} Logo`} />
      ) : (
        <h2>N</h2>
      )}
    </div>
    <h4 className="company-dropdown-name">{company.name}</h4>
  </li>
);

const Menus = () => {
  const { companylist, company } = useAuth();
  const dropdownRef = useRef(null);

  const { push } = useRouter();
  const [list, setList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selected, setSelected] = useState("Value mapping"); // Initial state set to 'Value mapping'

  const handleSelect = (item, path) => {
    setSelected(item);
    push(path);
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const res = await companylist();
        if (res && res.status) {
          setList(res.data);
          setSelectedCompany(res.data[0]); // Set the initial selected company to the first one
        } else {
          setError("Failed to fetch company list");
        }
      } catch (err) {
        setError("An error occurred while fetching the company list");
      } finally {
        setLoading(false);
      }
    };

    fetchUserinfo();
  }, [companylist, company]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedCompany]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const companycreatepage = () => {
    push(PATH_DASHBOARD.createcompany.root);
  };

  return (
    <>
      <ul className="metismenu" id="menu">
        {selectedCompany ? (
          <li
            onClick={toggleDropdown}
            className=" selected-dropdown d-flex align-items-center justify-content-start gap-2 cursor-pointer relative w-100"
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center gap-2">
                <div className="company-logo center">
                  {selectedCompany.logo ? (
                    <img
                      src={selectedCompany.logo}
                      alt={`${selectedCompany.name} Logo`}
                    />
                  ) : (
                    <h2>N</h2>
                  )}
                </div>
                <h4 className="company-name">{selectedCompany.name}</h4>
              </div>
              <div>
                <img
                  src="/assets/images/mark/dropdown.svg"
                  alt="dropdown-icon"
                />
              </div>
            </div>
            {dropdownOpen && (
              <ul ref={dropdownRef} className="dropdown">
                <h1>Switch Companies</h1>
                <div
                  className={`scoll-property ${
                    list.length > 2 ? "scroll-height" : ""
                  }`}
                >
                  {list.map((company) => (
                    <CompanyListItem
                      key={company.id}
                      company={company}
                      onClick={handleCompanySelect}
                      isSelected={selectedCompany.name === company.name}
                    />
                  ))}
                </div>

                <div
                  className="create-container d-flex align-items-center "
                  style={{ gap: "14px" }}
                  onClick={companycreatepage}
                >
                  <img
                    src="/assets/images/mark/second-plus.svg"
                    alt="plus-icon"
                  />
                  <h1 className="create-company">Create a new company</h1>
                </div>
                <div className="padding-lr-sixteen">
                  <h1 className="invite-heading">Invited Companies</h1>
                  <p className="invite-text">
                    You have been invited to these <br /> companies, join now:{" "}
                  </p>
                  <a className="show-invitation" href="#">
                    <span className="show-invitation-text">
                      See invitations
                    </span>
                    <span>
                      <img src="/assets/images/mark/right-arrow.svg" alt="" />
                    </span>
                  </a>
                </div>
              </ul>
            )}
          </li>
        ) : (
          <li className="d-flex align-items-center justify-content-start gap-2 cursor-pointer">
            <div className="company-logo center">
              <h2>N</h2>
            </div>
            <h4 className="company-name">No company</h4>
          </li>
        )}

        <div
          className="d-flex w-100 flex-column "
          style={{ gap: "27px", marginTop: "15px" }}
        >
          <li
            className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
              selected === "Company" ? "navigate-select" : ""
            }`}
            onClick={() =>
              handleSelect("Company", PATH_DASHBOARD.createcompany.root)
            }
          >
            <img src="/assets/images/mark/company.svg" alt="company-icon" />
            <h4 className="mapping">Company</h4>
          </li>
          <li
            className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
              selected === "Value mapping" ? "navigate-select" : ""
            }`}
            onClick={() => handleSelect("Value mapping", PATH_DASHBOARD.root)}
          >
            <img
              src="/assets/images/mark/value-mapping.svg"
              alt="Value Mapping"
            />
            <h4 className="mapping">Value mapping</h4>
          </li>
        </div>
      </ul>
      <ul className="metismenu-projects" id="menu">
        <li className="d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100">
          <img src="/assets/images/mark/plus.svg" alt="New Project" />
          <h4 className="project">New project</h4>
        </li>
      </ul>
    </>
  );
};

export default Menus;
