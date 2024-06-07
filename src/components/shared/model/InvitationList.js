import React, { useState, useEffect, useRef } from "react";
import { useAuth, useToaster } from "@/hooks";
import useOutsideClick from "@/hooks/useOutsideClick";
import CompanyLogo from "@/components/Dashboard/CompanyLogo";

const InvitationList = ({ setShowInvite, showInvite }) => {
  const { invitation, acceptinvite, acceptreject, setcompany } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const { toaster } = useToaster();
  const overlayRef = useRef(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await invitation();
        if (res && res.status) {
          setInvitations(
            res.data.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
          );
        } else {
          setInvitations([]);
        }
      } catch (err) {
        console.error("Error fetching invitations:", err);
        toaster("Failed to load invitations", "error");
      }
    };

    fetchInvitations();
  }, [invitation]);

  useOutsideClick(overlayRef, () => {
    if (showInvite) {
      setShowInvite(false);
    }
  });

  const handleAccept = async (company) => {
    try {
      const res = await acceptinvite(company);
      if (!res.status) {
        return toaster("Failed to accept the invitation", "error");
      }
      toaster(res.message, "success");
      setcompany(res);
      // Remove the accepted invitation from the list
      setInvitations((prev) =>
        prev.filter((invite) => invite.company !== company)
      );
    } catch (error) {
      toaster("Failed to process your acceptance", "error");
    }
  };

  const handleReject = async (company) => {
    try {
      const res = await acceptreject(company);
      if (!res.status) {
        return toaster("Failed to reject the invitation", "error");
      }
      toaster(res.message, "success");
      setcompany(res);
      // Remove the rejected invitation from the list
      setInvitations((prev) =>
        prev.filter((invite) => invite.company !== company)
      );
    } catch (error) {
      toaster("Failed to process your rejection", "error");
    }
  };

  const handleClose = () => {
    setShowInvite(false);
  };

  return (
    <div>
      {showInvite && (
        <div ref={overlayRef} className="invitation-overlay padding-company">
          <div className="company-content w-100 h-100">
            <div className="box-invitation">
              <div
                className="d-flex align-item-center justify-content-between setting-box"
                style={{ marginBottom: "24px" }}
              >
                <h1 className="company-setup-heading">Invitations</h1>
                <button className="save-btn" onClick={handleClose}>
                  <span>Close</span>
                </button>
              </div>
              {invitations.length > 0 ? (
                invitations.map((invite) => (
                  <div
                    key={invite.company}
                    className="d-flex align-items-center justify-content-between invitationlist"
                  >
                    <div className="d-flex align-items-center gap-2 ">
                      <CompanyLogo
                        logo={invite.logo}
                        name={invite.company_name}
                      />
                      <h3 className="companyinvite">{invite.company_name}</h3>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                      <button
                        onClick={() => handleAccept(invite.company)}
                        className="accept_btn"
                        style={{ padding: "13px 67px" }}
                      >
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleReject(invite.company)}
                        className="reject_btn"
                        style={{ padding: "13px 67px" }}
                      >
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No company invitations at the moment.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationList;
