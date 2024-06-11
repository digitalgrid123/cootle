import React, { useEffect, useState } from "react";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster, useTabs } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import PaginationComponent from "../table/Pagination";

const MemberModel = ({ activeTab }) => {
  const { toaster } = useToaster();
  const { inviteuser, member, removeMember } = useAuth();
  const selectedCompany = useGlobalCompany();

  const [emails, setEmails] = useState("");
  const [memberList, setMemberList] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Member");
  const [showDropdown, setShowDropdown] = useState({});
  const [pageLimit, setPageLimit] = useState(calculatePageLimit());

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

  useEffect(() => {
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
  const user = memberList?.user ?? {};

  // Calculate total number of pages based on pageLimit
  const pageCount = Math.ceil(invitations.length / pageLimit);

  return (
    <>
      <div className="setting-box border_bottom_Semi-Transparent_navy ">
        <h1 className="company-setup-heading weight-600">
          Add / Remove People from the Company
        </h1>
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
        <div className="member-container">
          <>
            <h1 className="member-list-heading weight-600">Members List</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead className="member_row border_bottom_Semi-Transparent_navy">
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
                <tr className="border_bottom_Semi-Transparent_navy">
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
                        user.profile_pic || "/assets/images/mark/profile.png"
                      }
                      alt="profile"
                    />
                    <div>
                      <h2 className="member_email weight-400">
                        {user.fullname || ""}
                      </h2>
                      <h2 className="member_email weight-400">{user.email}</h2>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="member-title weight-500">
                      Admin (Owner)
                    </span>
                    <span>
                      <img
                        src="/assets/images/mark/littledrop.svg"
                        alt="dropdown"
                      />
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
                    <tr
                      key={index}
                      className="border_bottom_Semi-Transparent_navy"
                    >
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
                      <td
                        className="relative cursor-pointer text-center"
                        onClick={() =>
                          setShowDropdown((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                      >
                        {member.accepted ? (
                          <>
                            <span className="member-title weight-500">
                              {selectedOption}
                            </span>
                            <span>
                              <img
                                src="/assets/images/mark/littledrop.svg"
                                alt="dropdown"
                              />
                            </span>
                            {showDropdown[index] && (
                              <div className="member-content">
                                <p
                                  onClick={() => setSelectedOption("Member")}
                                  className={
                                    selectedOption === "Member"
                                      ? "selected-option"
                                      : ""
                                  }
                                >
                                  Member
                                </p>
                                <p
                                  className={
                                    selectedOption === "Remove Member"
                                      ? "selected-option"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleRemoveMember(member.invited_user_id)
                                  } // Pass invited_user_id to the handler
                                >
                                  Remove Member
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="member-title weight-500">
                            Non-Member
                          </span>
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
          <div className="plr-14 margin-11">
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
