import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import CompanyListItem from "@/components/Dashboard/CompanyListItem";
import { setSelectedCompany, useGlobalCompany } from "@/utils/globalState";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import InvitationList from "@/components/shared/model/InvitationList";

const Menus = () => {
  const { companylist, company } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
  const [list, setList] = useState([]);

  const contentRef = useRef();

  const selectedCompany = useGlobalCompany();

  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await companylist();
        if (res && res.status) {
          setList(res.data);
          if (res.data.length > 0) {
            setSelectedCompany(res.data[res.data.length - 1]); // Select the last company
          }
        } else {
          setError("Failed to fetch company list");
        }
      } catch (err) {
        setError("An error occurred while fetching the company list");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [companylist, company]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item, path) => {
    setSelected(item);
    router.push(path);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const companyCreatePage = () => {
    setShowPopup((prevState) => !prevState);
  };

  const invitebox = () => {
    setShowInvite((prevState) => !prevState);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (
    !selectedCompany?.is_admin &&
    pathname === PATH_DASHBOARD.createcompany.root
  ) {
    router.push(PATH_DASHBOARD.root);
    return null;
  }

  return (
    <>
      <ul className="metismenu" id="menu">
        {selectedCompany ? (
          <li
            onClick={toggleDropdown}
            className="selected-dropdown d-flex align-items-center justify-content-start gap-2 cursor-pointer relative w-100"
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center gap-2">
                <CompanyLogo
                  logo={selectedCompany.logo}
                  name={selectedCompany.name}
                />
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
                  {list
                    .slice()
                    .reverse()
                    .map((company) => (
                      <CompanyListItem
                        key={company.id}
                        company={company}
                        onClick={handleCompanySelect}
                        isSelected={selectedCompany.name === company.name}
                      />
                    ))}
                </div>
                <div
                  className="create-container d-flex align-items-center"
                  style={{ gap: "14px" }}
                  onClick={companyCreatePage}
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
                    You have been invited to these <br /> companies, join now:
                  </p>
                  <a className="show-invitation" href="#" onClick={invitebox}>
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
            <CompanyLogo logo={null} name="No company" />
            <h4 className="company-name">No company</h4>
          </li>
        )}
        <div
          className="d-flex w-100 flex-column"
          style={{ gap: "27px", marginTop: "15px" }}
        >
          {selectedCompany?.is_admin && (
            <li
              className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
                pathname === PATH_DASHBOARD.createcompany.root ||
                pathname === PATH_DASHBOARD.createcompany.edit
                  ? "navigate-select"
                  : ""
              }`}
              onClick={() =>
                handleSelect("Company", PATH_DASHBOARD.createcompany.root)
              }
            >
              <img src="/assets/images/mark/company.svg" alt="company-icon" />
              <h4 className="mapping">Company</h4>
            </li>
          )}
          <li
            className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
              pathname === PATH_DASHBOARD.root ? "navigate-select" : ""
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
      <InvitationList showInvite={showInvite} setShowInvite={setShowInvite} />

      <CreateNewModel
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        contentRef={contentRef}
        companyCreatePage={companyCreatePage}
      />
    </>
  );
};

export default Menus;
