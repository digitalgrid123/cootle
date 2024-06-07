import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import React, { useEffect, useState } from "react";

const MemberModel = ({ activeTab }) => {
  const { toaster } = useToaster();
  const [emails, setEmails] = useState("");
  const { inviteuser, member } = useAuth();
  const [memberList, setMemberList] = useState([]);

  const [fetchTrigger, setFetchTrigger] = useState(false);
  const selectedcompany = useGlobalCompany();

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

        if (res && res.status) {
          setMemberList(res.data);
        } else {
          console.log("Failed to fetch member list");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfo();
  }, [member, fetchTrigger, selectedcompany]);

  return (
    <>
      {activeTab === "members" && (
        <>
          <div className="setting-box">
            <h1 className="company-setup-heading">
              Add / Remove People from the Company
            </h1>
          </div>
          <div className="company-container">
            <form onSubmit={handleSubmit}>
              <label className="label-company" htmlFor="companyName">
                Add People to Company
              </label>
              <div
                className="d-flex align-items-center"
                style={{ gap: "14px" }}
              >
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
                  <span>Send Invite</span>
                </button>
              </div>
            </form>
          </div>
          {memberList.length > 0 && (
            <>
              <h1
                className="company-setup-heading"
                style={{ marginBottom: "43px", marginTop: "20px" }}
              >
                Members
              </h1>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead className="member_row">
                  <tr>
                    <th className="member-text">Name</th>
                    <th className="member-text">Member Type</th>
                    <th className="member-text">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList?.invitations?.map((member, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #01033033" }}
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "14px 0",
                          }}
                        >
                          <img
                            src="/assets/images/mark/profile.png"
                            alt="profile"
                            style={{
                              marginRight: "10px",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                          <h2 className="member_email">{member.email}</h2>
                        </td>
                        <td className="">
                          <span className="member-title">Member</span>
                          <span>
                            <img
                              src="/assets/images/mark/littledrop.svg"
                              alt="dropdown"
                            />
                          </span>
                        </td>
                        <td
                          className={`text-status ${
                            member.accepted
                              ? "status-active"
                              : "status-invitation"
                          }`}
                        >
                          {member.accepted ? "Active" : "Invitation Sent"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MemberModel;
