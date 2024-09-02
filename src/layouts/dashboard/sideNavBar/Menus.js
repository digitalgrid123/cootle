import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import CompanyListItem from "@/components/Dashboard/CompanyListItem";
import ProjectListItem from "@/components/Dashboard/ProjectListItem";
import { setSelectedCompany, useGlobalCompany } from "@/utils/globalState";
import CreateNewModel from "@/components/shared/model/CreateNewModel";
import InvitationList from "@/components/shared/model/InvitationList";
import { USER_ROLES } from "@/constants/keywords";
import { getData, saveData } from "@/utils/storage";
import NewProjectModal from "@/components/shared/model/NewProjectModal";
import eventBus from "@/utils/eventBus";

const Menus = ({ isSmallScreen }) => {
  const { companylist, projectlist } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const projectListRef = useRef(null);
  const [companyList, setCompanyList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedCompany = useGlobalCompany();

  const isAdmin = getData(USER_ROLES.SUPER_ADMIN);
  const [showPopup, setShowPopup] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const fetchCompanyList = async () => {
    try {
      const res = await companylist();
      if (res?.status) {
        setCompanyList(res.data);
        const savedCompany = localStorage.getItem("selectedCompany");
        if (savedCompany) {
          const parsedCompany = JSON.parse(savedCompany);
          setSelectedCompany(parsedCompany);
        } else {
          setSelectedCompany(res.data[res.data.length - 1]);
        }
      } else {
        console.error("Failed to fetch company list");
      }
    } catch (err) {
      console.error("Error fetching company list:", err);
    }
  };

  useEffect(() => {
    fetchCompanyList();

    const handleCompanyCreated = () => {
      fetchCompanyList(); // Refresh company list when a new company is created
    };

    eventBus.on("companyCreated", handleCompanyCreated);
    eventBus.on("Accepted", handleCompanyCreated);

    return () => {
      eventBus.off("companyCreated", handleCompanyCreated);
      eventBus.off("Accepted", handleCompanyCreated);
    };
  }, []);

  const fetchProjectList = useCallback(async () => {
    try {
      const res = await projectlist();
      if (res?.status) {
        setProjectList(res.data);
      } else {
        console.error("Failed to fetch project list");
      }
    } catch (err) {
      console.error("Error fetching project list:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjectList();
  }, [selectedCompany]);

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

    // Set the active menu item based on the current pathname
    if (pathname.startsWith(PATH_DASHBOARD.createcompany.root)) {
      setActiveMenuItem(PATH_DASHBOARD.createcompany.root);
    } else if (pathname === PATH_DASHBOARD.root) {
      setActiveMenuItem(PATH_DASHBOARD.root);
    } else if (pathname.startsWith("/dashboard/project")) {
      setActiveMenuItem("/dashboard/project");
    }
  }, [isAdmin, pathname, router]);

  const handleSelect = useCallback(
    (path) => {
      if (router.pathname !== path) {
        setActiveMenuItem(path);
        router.push(path);
      }
    },
    [router, setActiveMenuItem]
  );

  const handleCompanySelect = useCallback(
    (company) => {
      setSelectedCompany(company);
      fetchProjectList();
      localStorage.setItem("selectedCompany", JSON.stringify(company));
      setActiveMenuItem(PATH_DASHBOARD.root);
      router.push(PATH_DASHBOARD.root);
    },
    [router]
  );

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const togglePopup = useCallback((setter) => {
    setter((prev) => !prev);
  }, []);

  const renderCompanyList = () =>
    companyList
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

  const reversedProjectList = useMemo(
    () => projectList.slice().reverse(),
    [projectList]
  );

  const renderProjectList = () => {
    return reversedProjectList.map((project, index) => {
      const projectPath = PATH_DASHBOARD.project.view(project.id, project.name);
      const projectBasePath = projectPath.split("?")[0];
      const isActive = pathname.startsWith(projectBasePath);

      const displayName = isSmallScreen ? `p${index + 1}` : project.name;
      return (
        <ProjectListItem
          key={project.id}
          project={{ ...project, name: displayName }}
          isActive={isActive}
          isSmallScreen={isSmallScreen}
          fetchProjectList={fetchProjectList}
          onClick={() => handleSelect(projectPath)}
        />
      );
    });
  };

  const truncateCompanyName = (name, charLimit) => {
    // Trim extra whitespace from the name
    const trimmedName = name.trim() || "";

    // Check if the length of the name exceeds the charLimit
    if (trimmedName.length > charLimit) {
      return trimmedName.slice(0, charLimit) + "...";
    }
    return trimmedName;
  };
  // Adjust height based on available viewport height
  useEffect(() => {
    const adjustHeight = () => {
      if (projectListRef.current) {
        const viewportHeight = window.innerHeight;
        const offset = projectListRef.current.getBoundingClientRect().top;
        const maxHeight = viewportHeight - offset - 110; // 110px for padding and margins
        projectListRef.current.style.maxHeight = `${maxHeight}px`;

        // Check if the content height exceeds the maxHeight
        const needsScrollbar = projectListRef.current.scrollHeight > maxHeight;
        projectListRef.current.style.overflowY = needsScrollbar
          ? "scroll"
          : "visible";
        setHasScrollbar(needsScrollbar); // Update the state
      }
    };

    adjustHeight(); // Initial adjustment
    window.addEventListener("resize", adjustHeight); // Adjust on resize

    // Optional: Re-adjust on content changes or layout shifts
    const observer = new MutationObserver(adjustHeight);
    observer.observe(projectListRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", adjustHeight);
      observer.disconnect(); // Clean up the observer
    };
  }, [projectList]);
  const gapValue = isSmallScreen ? "11px" : "";

  return (
    <>
      <ul className="metismenu border_bottom_Light" id="menu">
        {selectedCompany ? (
          <li
            onClick={toggleDropdown}
            className={`selected-dropdown d-flex align-items-center justify-content-start gap-2 cursor-pointer relative w-100 ${
              dropdownOpen ? "active-dropdown" : ""
            }`}
          >
            <div
              className={`d-flex align-items-center justify-content-between w-100 `}
              style={{ gap: gapValue }}
            >
              <div className="d-flex align-items-center gap-2">
                <CompanyLogo
                  logo={selectedCompany.logo}
                  name={selectedCompany.name}
                />
                <h4 className="company-name weight-400 hide-on-small-screen text-nowrap ">
                  {truncateCompanyName(selectedCompany.name, 15) || ""}
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
                    companyList.length > 2 ? "scroll-height" : ""
                  }`}
                >
                  {renderCompanyList()}
                </div>
                <div
                  className="create-container d-flex align-items-center gap-2 border_bottom_shadowy"
                  onClick={() => togglePopup(setShowPopup)}
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
                    onClick={() => togglePopup(setShowInvite)}
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
          <li className="d-flex align-items-center justify-content-start gap-2 cursor-pointer mb-20">
            <CompanyLogo logo={null} name="No company" />
            <h4 className="company-name weight-400">No company</h4>
          </li>
        )}
        <div className="d-flex w-100 flex-column gap-3">
          {isAdmin && (
            <li
              className={`d-flex align-items-center ${
                isSmallScreen
                  ? "justify-content-center"
                  : "justify-content-start"
              }  gap-3 cursor-pointer w-100 padding-lr-sixteen ${
                activeMenuItem === PATH_DASHBOARD.createcompany.root ||
                pathname === PATH_DASHBOARD.createcompany.edit
                  ? "navigate-select"
                  : ""
              }`}
              onClick={() => handleSelect(PATH_DASHBOARD.createcompany.root)}
            >
              <img
                src={
                  activeMenuItem === PATH_DASHBOARD.createcompany.root ||
                  pathname === PATH_DASHBOARD.createcompany.edit
                    ? "/assets/images/mark/company.svg"
                    : "/assets/images/mark/inactive-company.svg"
                }
                style={{ width: "24px" }}
                alt="company-icon"
              />
              <h4 className="mapping f-16 weight-400 hide-on-small-screen">
                Company
              </h4>
            </li>
          )}
          <li
            className={`d-flex align-items-center ${
              isSmallScreen ? "justify-content-center" : "justify-content-start"
            } gap-3 cursor-pointer w-100 padding-lr-sixteen ${
              activeMenuItem === PATH_DASHBOARD.root ? "navigate-select" : ""
            }`}
            onClick={() => handleSelect(PATH_DASHBOARD.root)}
          >
            <img
              src={
                activeMenuItem === PATH_DASHBOARD.root
                  ? "/assets/images/mark/value-mapping-active.svg"
                  : "/assets/images/mark/value-mapping-inactive.svg"
              }
              style={{ width: "24px" }}
              alt="Value Mapping"
            />
            <span className="mapping f-16 weight-400 hide-on-small-screen">
              Value mapping
            </span>
          </li>
        </div>
      </ul>
      <ul
        className={hasScrollbar ? "projects-menu-scroll " : "projects-menu"}
        id="menu"
      >
        {isAdmin && (
          <li
            className="d-flex align-items-center justify-content-start gap-3 cursor-pointer w-100 mb-16 padding-lr-sixteen no-padding-lr "
            onClick={() => togglePopup(setShowProjectPopup)}
          >
            <img
              src="/assets/images/mark/plus.svg"
              style={{ width: "20px" }}
              alt="New Project"
            />
            <span className="project weight-400">
              {isSmallScreen ? "Project" : "New Project"}
            </span>
          </li>
        )}

        <div className="d-flex w-100 flex-column">
          <div
            ref={projectListRef}
            className={`relative ${hasScrollbar && "project-list"}`}
          >
            {renderProjectList()}
          </div>
        </div>
      </ul>
      <div>
        <CreateNewModel
          onClose={() => togglePopup(setShowPopup)}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          contentRef={dropdownRef}
        />
        <InvitationList
          onClose={() => togglePopup(setShowInvite)}
          showInvite={showInvite}
          setShowInvite={setShowInvite}
        />
        <NewProjectModal
          onClose={() => togglePopup(setShowProjectPopup)}
          showProjectPopup={showProjectPopup}
          setShowProjectPopup={setShowProjectPopup}
          fetchProjectList={fetchProjectList}
        />
      </div>
    </>
  );
};

export default Menus;
