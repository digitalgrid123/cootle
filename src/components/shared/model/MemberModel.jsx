import { useAuth } from "@/hooks";
import { useGlobalCompany } from "@/utils/globalState";
import React, { useState } from "react";
import axios from "axios";

const MemberModel = ({ activeTab }) => {
  const selectedCompany = useGlobalCompany();
  const [emails, setEmails] = useState("");
  const { inviteuser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await inviteuser({
        company: selectedCompany,
        emails: emails.split(",").map((email) => email.trim()),
      });

      // Handle success, maybe clear the input or show a success message
      console.log("Invites sent successfully:", response.data);
      setEmails("");
    } catch (error) {
      // Handle error
      console.error("Error sending invites:", error);
    }
  };

  return (
    <>
      {activeTab === "members" && (
        <>
          <div className="setting-box">
            <h1 className="company-setup-heading">
              Add / Remove People from the company
            </h1>
          </div>
          <div className="company-container">
            <form onSubmit={handleSubmit}>
              <label className="label-company" htmlFor="companyName">
                Add people to company
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
        </>
      )}
    </>
  );
};

export default MemberModel;
