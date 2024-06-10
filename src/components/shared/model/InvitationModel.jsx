import CompanyLogo from "@/components/Dashboard/CompanyLogo";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { useAuth, useToaster } from "@/hooks";
import React, { useEffect, useState } from "react";

const InvitationModel = ({ showPopup, next, contentRef, setShowPopup }) => {
  const { invitation, acceptreject, acceptinvite, setcompany } = useAuth();
  const [invite, setInvite] = useState(null);
  const { toaster } = useToaster();
  const nextbox = () => {
    next();
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await invitation();
        if (res && res.status) {
          if (res.data.length > 0) {
            const sortedInvites = res.data.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setInvite(sortedInvites[0]);
          } else {
            setInvite(null);
          }
        }
      } catch (err) {
        console.error("fetchUserInfo ~ err:", err);
      }
    };

    fetchUserInfo();
  }, [invitation]);

  const handleAccept = async () => {
    try {
      const res = await acceptinvite(invite.company);

      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      toaster(res?.message, TOAST_TYPES.SUCCESS);
      setcompany(res);
      setShowPopup(false);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleReject = async () => {
    try {
      const res = await acceptreject(invite.company);

      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      toaster(res?.message, TOAST_TYPES.SUCCESS);
      fetchUserInfo();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="invitation-overlay">
          <div ref={contentRef} className="invitation-content ">
            <div className="box-container center">
              <div>
                <h1 className="invitation-heading weight-600">
                  Join a Company
                </h1>
                <div className="invitation-detail">
                  {invite ? (
                    <div className="invite-content w-100 weight-500">
                      <div className="d-flex align-items-center gap-2">
                        <CompanyLogo
                          logo={invite.logo_url}
                          name={invite.company_name}
                        />
                        <div className="companyinvite weight-500">
                          {invite.company_name}
                        </div>
                      </div>
                      <p className="invitation_prompt weight-500">
                        You have been invited to join this company
                      </p>
                      <div className="invite-actions">
                        <button onClick={handleAccept} className="accept_btn">
                          <span className="weight-500">Accept</span>
                        </button>
                        <button onClick={handleReject} className="reject_btn">
                          <span className="weight-500">Reject</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="invite-content weight-500">
                      Currently no company invites
                    </p>
                  )}
                </div>
              </div>
              <div className="line"></div>
              <div>
                <h1 className="invitation-heading weight-600">
                  Create Your Own
                </h1>
                <div className="company-detail" onClick={nextbox}>
                  <div className="center gap-3">
                    <img
                      src="/assets/images/mark/second-plus.svg"
                      alt="plus-icon"
                    />
                    <p className="company-content-text m-0 weight-500">
                      Create a new company
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationModel;
