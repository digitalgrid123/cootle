import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import CompanyListItem from "@/components/Dashboard/CompanyListItem";
import { setSelectedCompany, useGlobalCompany } from "@/utils/globalState";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import InvitationList from "@/components/shared/model/InvitationList";
import { USER_ROLES } from "@/constants/keywords";
import { getData } from "@/utils/storage";

const Menus = () => {
  const { companylist } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const [list, setList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const selectedCompany = useGlobalCompany();
  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);

  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        const res = await companylist();
        if (res?.status) {
          setList(res.data);
          const lastCompany = res.data[res.data.length - 1];
          setSelectedCompany(lastCompany);
        } else {
          console.error("Failed to fetch company list");
        }
      } catch (err) {
        console.error("Error fetching company list:", err);
      }
    };

    fetchCompanyList();
  }, [companylist]);

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

  useEffect(() => {
    if (!isAdmin && pathname === PATH_DASHBOARD.createcompany.root) {
      router.push(PATH_DASHBOARD.root);
    }
  }, [isAdmin, pathname, router]);

  const handleSelect = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );

  const handleCompanySelect = useCallback((selectedCompany) => {
    setSelectedCompany(selectedCompany);
    setDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleCompanyCreate = useCallback(() => {
    setShowPopup((prev) => !prev);
  }, []);

  const handleShowInvite = useCallback(() => {
    setShowInvite((prev) => !prev);
  }, []);

  const renderCompanyList = () =>
    list
      .slice()
      .reverse()
      .map((company) => (
        <CompanyListItem
          key={company.id}
          company={company}
          onClick={handleCompanySelect}
          isSelected={selectedCompany.name === company.name}
        />
      ));

  return (
    <>
      <ul className="metismenu border_bottom_Light" id="menu">
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
                <h4 className="company-name weight-500">
                  {selectedCompany.name}
                </h4>
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
                <h1 className="weight-500">Switch Companies</h1>
                <div
                  className={`scroll-property border_bottom_shadowy ${
                    list.length > 2 ? "scroll-height" : ""
                  }`}
                >
                  {renderCompanyList()}
                </div>
                <div
                  className="create-container d-flex align-items-center gap-2 border_bottom_shadowy"
                  onClick={handleCompanyCreate}
                >
                  <img
                    src="/assets/images/mark/second-plus.svg"
                    alt="plus-icon"
                  />
                  <h1 className="create-company weight-500">
                    Create a new company
                  </h1>
                </div>
                <div className="padding-lr-sixteen">
                  <h1 className="invite-heading weight-500">
                    Invited Companies
                  </h1>
                  <p className="invite-text weight-500">
                    You have been invited to these <br /> companies, join now:
                  </p>
                  <a
                    className="show-invitation"
                    href="#"
                    onClick={handleShowInvite}
                  >
                    <span className="show-invitation-text weight-500">
                      See invitations
                    </span>
                    <span>
                      <img
                        src="/assets/images/mark/right-arrow.svg"
                        alt="right-arrow"
                      />
                    </span>
                  </a>
                </div>
              </ul>
            )}
          </li>
        ) : (
          <li className="d-flex align-items-center justify-content-start gap-2 cursor-pointer">
            <CompanyLogo logo={null} name="No company" />
            <h4 className="company-name weight-500">No company</h4>
          </li>
        )}
        <div className="d-flex w-100 flex-column gap-3">
          {isAdmin && (
            <li
              className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
                pathname === PATH_DASHBOARD.createcompany.root ||
                pathname === PATH_DASHBOARD.createcompany.edit
                  ? "navigate-select"
                  : ""
              }`}
              onClick={() => handleSelect(PATH_DASHBOARD.createcompany.root)}
            >
              <img src="/assets/images/mark/company.svg" alt="company-icon" />
              <h4 className="mapping f-16 weight-500">Company</h4>
            </li>
          )}
          <li
            className={`d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100 padding-lr-sixteen ${
              pathname === PATH_DASHBOARD.root ? "navigate-select" : ""
            }`}
            onClick={() => handleSelect(PATH_DASHBOARD.root)}
          >
            <img
              src="/assets/images/mark/value-mapping.svg"
              alt="Value Mapping"
            />
            <h4 className="mapping f-16 weight-500">Value mapping</h4>
          </li>
        </div>
      </ul>
      <ul className="metismenu-projects" id="menu">
        <li className="d-flex align-items-center justify-content-start gap-2 cursor-pointer w-100">
          <img src="/assets/images/mark/plus.svg" alt="New Project" />
          <h4 className="project weight-500">New Project</h4>
        </li>
      </ul>
      <div>
        <CreateNewModel
          onClose={handleCompanyCreate}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          contentRef={dropdownRef}
        />

        <InvitationList
          onClose={handleShowInvite}
          showInvite={showInvite}
          setShowInvite={setShowInvite}
        />
      </div>
    </>
  );
};

export default Menus;
