import React, { useEffect, useRef, useState } from "react";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster, useTabs } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import PaginationComponent from "../table/Pagination";

const MemberModel = ({ activeTab, setShowPopup, showPopup }) => {
  const { toaster } = useToaster();
  const {
    inviteuser,
    member,
    removeMember,
    assignAdmin,
    memberslist,
    user,
    unassignAdmin,
    removeinvitation,
  } = useAuth();
  const selectedCompany = useGlobalCompany();

  const [emails, setEmails] = useState("");
  const [memberList, setMemberList] = useState({});

  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Member");
  const [showDropdown, setShowDropdown] = useState({});
  const [pageLimit, setPageLimit] = useState(calculatePageLimit());
  const [owner, setOwner] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination state
  const [activePage, setActivePage] = useState(1);

  function calculatePageLimit() {
    // Get the height of the visible area in the browser window
    const windowHeight = window.innerHeight;
    // Calculate the page limit dynamically based on the window height
    const calculatedLimit = Math.floor(windowHeight / 200); // Adjust the divisor as needed
    return calculatedLimit > 0 ? calculatedLimit : 1; // Ensure at least 1 item per page
  }

  useEffect(() => {
    const handleResize = () => {
      setPageLimit(calculatePageLimit());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const result = await memberslist();
        if (result.status) {
          const ownerData = result.data.filter((member) => member.is_owner);
          setOwner(ownerData.length > 0 ? ownerData[0] : null);
        } else {
          throw new Error("Failed to fetch member list");
        }
      } catch (error) {
        console.error("Error fetching member list:", error);
      }
    };

    fetchMemberData();
  }, [memberslist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await inviteuser(emails);
      if (response.status) {
        toaster(response.message, TOAST_TYPES.SUCCESS);
        setEmails("");
        setFetchTrigger((prev) => !prev);
      } else {
        toaster(response.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await member();
      if (res?.status) {
        setMemberList(res.data);
      } else {
        console.error("Failed to fetch member list");
      }
    } catch (err) {
      console.error("Error fetching member list:", err);
    }
  };
  useEffect(() => {
    fetchUserInfo(); // Fetch initially

    const intervalId = setInterval(() => {
      fetchUserInfo();
    }, 20000); // Fetch every 20 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [member, fetchTrigger, selectedCompany]);

  if (activeTab !== "members") {
    return null;
  }

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await removeMember(memberId);
      if (response.status) {
        toaster(response.message, TOAST_TYPES.SUCCESS);
        setFetchTrigger((prev) => !prev);
      } else {
        toaster(response.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const invitations = memberList?.invitations ?? [];

  const handleAssignAdmin = async (memberId) => {
    try {
      // Perform API call to assign admin
      const response = await assignAdmin(memberId);
      if (response.status) {
        toaster("Successfully Authorized", TOAST_TYPES.SUCCESS);
        setFetchTrigger((prev) => !prev); // Trigger data refresh
        fetchUserInfo();
      } else {
        toaster("Not able to authorized", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleUnassignAdmin = async (memberId) => {
    try {
      // Perform API call to assign admin
      const response = await unassignAdmin(memberId);
      if (response.status) {
        toaster("Successfully Authorized", TOAST_TYPES.SUCCESS);
        setFetchTrigger((prev) => !prev); // Trigger data refresh
        fetchUserInfo();
      } else {
        toaster("Not able to authorized", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };
  const handleRemoveInvitation = async (memberId) => {
    try {
      // Perform API call to assign admin
      const response = await removeinvitation(memberId);
      if (response.status) {
        toaster("Successfully Remove", TOAST_TYPES.SUCCESS);
        setFetchTrigger((prev) => !prev); // Trigger data refresh
        fetchUserInfo();
      } else {
        toaster("Not able to Remove", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const isOwner = user?.is_owner && owner?.is_owner && user?.id === owner?.id;

  const handleClose = () => {
    setShowPopup(false);
  };

  const toggleDropdown = (index) => {
    setShowDropdown((prev) => {
      const newDropdownState = {};
      Object.keys(prev).forEach((key) => {
        newDropdownState[key] = false; // Close all dropdowns
      });
      newDropdownState[index] = !prev[index]; // Toggle the clicked dropdown
      return newDropdownState;
    });
  };

  const handleButtonClick = (event, index) => {
    event.stopPropagation();
    toggleDropdown(index);
  };

  return (
    <>
      <div className="setting-box border_bottom_pastel d-flex align-items-center justify-content-between">
        <h1
          className={`company-setup-heading weight-500 ${
            !showPopup ? "mt-10" : ""
          }`}
        >
          Add / Remove People from the Company
        </h1>
        {showPopup && (
          <button className="close_btn" onClick={handleClose}>
            <span className="weight-600">Close</span>
          </button>
        )}
      </div>
      <div className="company-container  ">
        <form onSubmit={handleSubmit}>
          <label className="label-company weight-500 " htmlFor="companyName">
            Add People to Company
          </label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              id="companyName"
              className="input-company w-100"
              name="companyName"
              placeholder="Insert emails, separated with comma"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <button type="submit" className="send_btn">
              <span className="weight-500 f-16">Send Invite</span>
            </button>
          </div>
        </form>
      </div>
      {invitations.length > 0 ? (
        <div className="member-container relative">
          <>
            <h1 className="member-list-heading weight-600">Members List</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead className="member_row border_bottom_pastel">
                <tr>
                  <th className="member-text weight-600 text-start  plr-14">
                    Name
                  </th>
                  <th className="member-text weight-600 text-center">
                    Member Type
                  </th>
                  <th className="member-text weight-600 text-end pr-70 ">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border_bottom_pastel">
                  <td
                    className="plr-14"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "14px",
                      paddingBottom: "14px",
                    }}
                  >
                    <img
                      className="profile-member"
                      src={
                        owner?.profile_pic || "/assets/images/mark/profile.png"
                      }
                      alt="profile"
                    />
                    <div>
                      <h2 className="member_email weight-400">
                        {owner?.fullname || ""}
                      </h2>
                      <h2 className="member_email weight-400">
                        {owner?.email}
                      </h2>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="member-title weight-500">
                      Admin (Owner)
                    </span>
                  </td>
                  <td
                    className={`text-status weight-500 status-active text-end
                  pr-70 `}
                  >
                    Active
                  </td>
                </tr>
                {invitations
                  .slice((activePage - 1) * pageLimit, activePage * pageLimit)
                  .map((member, index) => (
                    <tr key={index} className="border_bottom_pastel">
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "14px",
                          paddingBottom: "14px",
                        }}
                        className="plr-14"
                      >
                        <img
                          className="profile-member"
                          src={
                            member.invited_user_profile_pic ||
                            "/assets/images/mark/profile.png"
                          }
                          alt="profile"
                        />

                        <div>
                          <h2 className="member_email weight-400">
                            {member.invited_user_fullname &&
                            !member.invited_user_fullname.startsWith("User#")
                              ? member.invited_user_fullname
                              : ""}
                          </h2>

                          <h2 className="member_email weight-400">
                            {member.email}
                          </h2>
                        </div>
                      </td>
                      <td className="relative  text-center">
                        {member.accepted ? (
                          <>
                            <button
                              className="dropdown-btn"
                              onClick={(e) => handleButtonClick(e, index)}
                            >
                              <span className="member-title weight-500">
                                {member.invited_is_admin
                                  ? "Admin"
                                  : selectedOption}
                              </span>
                              <span>
                                <img
                                  src="/assets/images/mark/littledrop.svg"
                                  alt="dropdown"
                                  // onClick={() => toggleDropdown(index)}
                                />
                              </span>
                            </button>
                            {isOwner && (
                              <>
                                {showDropdown[index] && (
                                  <div
                                    className="member-content"
                                    ref={dropdownRef}
                                  >
                                    <p
                                      onClick={() =>
                                        setSelectedOption("Member")
                                      }
                                      className={`cursor-pointer ${
                                        selectedOption === "Member"
                                          ? "selected-option"
                                          : ""
                                      }`}
                                    >
                                      {member.invited_is_admin
                                        ? "Admin"
                                        : "Member"}
                                    </p>
                                    {member.invited_is_admin ? (
                                      <p
                                        onClick={() =>
                                          handleUnassignAdmin(
                                            member.invited_user_id
                                          )
                                        }
                                        className={`cursor-pointer ${
                                          selectedOption === "Unassign Admin"
                                            ? "selected-option"
                                            : ""
                                        }`}
                                      >
                                        Unauthorized as admin
                                      </p>
                                    ) : (
                                      <p
                                        onClick={() =>
                                          handleAssignAdmin(
                                            member.invited_user_id
                                          )
                                        }
                                        className={`cursor-pointer ${
                                          selectedOption === "Assign Admin"
                                            ? "selected-option"
                                            : ""
                                        }`}
                                      >
                                        Authorize as admin
                                      </p>
                                    )}
                                    <p
                                      onClick={() =>
                                        handleRemoveMember(
                                          member.invited_user_id
                                        )
                                      }
                                      className={`cursor-pointer ${
                                        selectedOption === "Remove Member"
                                          ? "selected-option"
                                          : ""
                                      }`}
                                    >
                                      Remove Member
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                            {!isOwner && !member.invited_is_admin && (
                              <>
                                {showDropdown[index] && (
                                  <div
                                    className="dropdown-menu member-dropdown"
                                    ref={dropdownRef}
                                  >
                                    <ul>
                                      {member.invited_user_fullname &&
                                      !member.invited_user_fullname.startsWith(
                                        "User#"
                                      ) ? (
                                        <>
                                          {isOwner && (
                                            <li
                                              className="cursor-pointer"
                                              onClick={() =>
                                                handleRemoveMember(member.id)
                                              }
                                            >
                                              Remove Member
                                            </li>
                                          )}
                                          {member.is_admin ? (
                                            <li
                                              className="cursor-pointer"
                                              onClick={() =>
                                                handleUnassignAdmin(member.id)
                                              }
                                            >
                                              Unassign as Admin
                                            </li>
                                          ) : (
                                            <li
                                              className="cursor-pointer"
                                              onClick={() =>
                                                handleAssignAdmin(member.id)
                                              }
                                            >
                                              Assign as Admin
                                            </li>
                                          )}
                                        </>
                                      ) : (
                                        <li
                                          className="mb-0 p-0 cursor-pointer"
                                          onClick={() =>
                                            handleRemoveMember(member.id)
                                          }
                                        >
                                          Remove Invitation
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              className="dropdown-btn"
                              onClick={(e) => handleButtonClick(e, index)}
                            >
                              <span className="member-title weight-500 ">
                                Non-Member
                              </span>

                              <span>
                                <img
                                  src="/assets/images/mark/littledrop.svg"
                                  alt="dropdown"
                                  // onClick={() => toggleDropdown(index)}
                                />
                              </span>
                            </button>
                            {isOwner && (
                              <>
                                {showDropdown[index] && (
                                  <div
                                    className="member-content"
                                    ref={dropdownRef}
                                  >
                                    <p
                                      onClick={() =>
                                        handleRemoveInvitation(member.id)
                                      }
                                      className={`mb-0 p-0 cursor-pointer 
                                        ${
                                          selectedOption === "Remove Member "
                                            ? "selected-option"
                                            : ""
                                        }
                                      `}
                                    >
                                      Remove Invitation
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </td>
                      <td
                        className={`text-status weight-500 text-end pr-70 ${
                          member.accepted
                            ? "status-active"
                            : member.rejected
                            ? "status-invitation"
                            : "status-invitation"
                        }`}
                      >
                        {member.accepted
                          ? "Active"
                          : member.rejected
                          ? "Invitation Rejected"
                          : "Invitation Sent"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
          <div className="pagination-component">
            <PaginationComponent
              activePage={activePage}
              total={invitations.length}
              onPageChanged={setActivePage}
              pageLimit={pageLimit}
              isLastPage={activePage * pageLimit >= invitations.length}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MemberModel;
