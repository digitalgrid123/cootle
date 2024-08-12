import React, { useCallback, useState, useEffect, useRef } from "react";
import Title from "@/components/Dashboard/Title";
import { useNotifications } from "@/hooks";
import { Loader } from "@/components/shared/loader";
import InvitationList from "./InvitationList";
import { useAuth, useToaster } from "@/hooks";
import useOutsideClick from "@/hooks/useOutsideClick";
import CompanyLogo from "@/components/Dashboard/CompanyLogo";

const NotificationModel = ({
  isDropdownOpen,
  setDropdownOpen,
  dropdownRef,
}) => {
  const { notifications, isLoading, clearAll, removeall, deleteNotification } =
    useNotifications();
  const { invitation, acceptinvite, acceptreject, setcompany } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const { toaster } = useToaster();

  const [initialLoading, setInitialLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const notificationModelRef = useRef(null);
  const overlayRef = useRef(null);

  const handleShowInvite = useCallback(() => {
    setActiveTab("invitations");
    setShowInvite(true);
    setDropdownOpen(false);
  }, [setDropdownOpen]);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        notificationModelRef.current &&
        !notificationModelRef.current.contains(event.target) &&
        isDropdownOpen
      ) {
        setDropdownOpen(false);
      }
    },
    [isDropdownOpen, setDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!isLoading) {
      setInitialLoading(false);
    }
  }, [isLoading]);

  const safeNotifications = notifications || [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "invitations") {
      setShowInvite(true);
    } else {
      setShowInvite(false);
    }
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  // Function to extract the username from the notification message
  const extractUserName = (message) => {
    const nameRegex = /^[A-Z][a-z]*\s[A-Z][a-z]*\.?/;
    const match = message.match(nameRegex);
    return match ? match[0] : "User";
  };

  // Function to extract the rest of the message
  const extractMessage = (message, username) => {
    return message.replace(username, "").trim();
  };

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

  useEffect(() => {
    fetchInvitations();
    const interval = setInterval(() => fetchInvitations(), 20000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isDropdownOpen]);

  return (
    isDropdownOpen && (
      <div ref={dropdownRef} className="invitation-overlay">
        <div
          ref={notificationModelRef}
          className="invitation-content"
          style={{ flex: "0" }}
        >
          <div className="notification-container">
            <div className="h-100 d-flex flex-column c">
              <div className="w-100 d-flex justify-content-between align-items-center border_bottom_soft-lavender pb-16">
                <h1 className="notification-title-heading weight-600">
                  Notifications
                </h1>

                <button className="update_btn" onClick={handleCloseDropdown}>
                  <span>Close</span>
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-16 pb-32 border_bottom_soft-lavender">
                <div className="d-flex align-items-center gap-3">
                  <button
                    className={`tab-btn d-flex align-items-center gap-1 ${
                      activeTab === "all" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("all")}
                  >
                    <img
                      src="/assets/images/mark/eye.svg"
                      alt=" notification-icon"
                    />
                    <span>All Notifications</span>
                  </button>
                  <button
                    className={`tab-btn d-flex align-items-center gap-1 ${
                      activeTab === "invitations" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("invitations")}
                  >
                    <img
                      src="/assets/images/mark/send.svg"
                      alt=" notification-icon"
                    />
                    <span>Invitations</span>
                  </button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="notify-clean-btn"
                    onClick={clearAll}
                    disabled={isLoading}
                  >
                    <span>Mark All as Read</span>
                  </button>
                  <button className="notify-clean-btn" onClick={removeall}>
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
              <div className="notification-scroll">
                {initialLoading ? (
                  <Loader />
                ) : activeTab === "invitations" ? (
                  invitations.length > 0 ? (
                    invitations.map((invite) => (
                      <div
                        key={invite.company}
                        className="d-flex align-items-center justify-content-between invitationlist margin-11"
                      >
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center gap-2">
                            <CompanyLogo
                              logo={invite.logo}
                              name={invite.company_name}
                            />
                            <h3 className="companyinvite weight-500">
                              {invite.company_name}
                            </h3>
                          </div>
                          <p className="notification-message m-0 deeppurple weight-500">
                            You have been invited to join {invite.company_name}
                          </p>
                        </div>
                        <div className="d-flex flex-column gap-2 align-items-center">
                          <p className="notification-message weight-400 m-0 deeppurple">
                            Received at:{" "}
                            {new Date(invite.created_at).toLocaleDateString()}
                          </p>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              onClick={() => handleAccept(invite.company)}
                              className="accept_btn"
                            >
                              <span className="weight-500">Accept</span>
                            </button>
                            <button
                              onClick={() => handleReject(invite.company)}
                              className="reject_btn"
                            >
                              <span className="weight-500">Reject</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="padding-top-70-bottom-90">
                      <p className="caught-text">You're all caught up!</p>
                      <p className="no-notification">
                        No notification at the moment.
                      </p>
                    </div>
                  )
                ) : (
                  <>
                    {safeNotifications.length === 0 &&
                    invitations.length === 0 ? (
                      <div className="padding-top-70-bottom-90">
                        <p className="caught-text">You're all caught up!</p>
                        <p className="no-notification">
                          No notification at the moment.
                        </p>
                      </div>
                    ) : (
                      <>
                        {safeNotifications.length > 0 &&
                          safeNotifications.map((notification, index) => {
                            const username = extractUserName(
                              notification.message
                            );
                            const message = extractMessage(
                              notification.message,
                              username
                            );
                            return (
                              <div
                                key={index}
                                className={`d-flex align-items-start justify-content-between notification-item border_bottom_soft-lavender pb-16 pt-16 ${
                                  notification.is_read ? "read" : "unread"
                                }`}
                              >
                                <div>
                                  <p className="notification-message m-0 deeppurple">
                                    <span className="weight-600">
                                      {username}
                                    </span>{" "}
                                    <span className="weight-500">
                                      {message}
                                    </span>
                                  </p>
                                  <p className="notification-message weight-400 m-0 deeppurple">
                                    Received at:{" "}
                                    {new Date(
                                      notification.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <button
                                  className="cross_btn"
                                  onClick={() =>
                                    deleteNotification(notification.id)
                                  }
                                >
                                  <img
                                    src="/assets/images/mark/close.svg"
                                    alt="close_btn"
                                  />
                                </button>
                              </div>
                            );
                          })}
                        {invitations.length > 0 &&
                          invitations.map((invite) => (
                            <div
                              key={invite.company}
                              className="d-flex align-items-center justify-content-between invitationlist margin-11"
                            >
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center gap-2">
                                  <CompanyLogo
                                    logo={invite.logo}
                                    name={invite.company_name}
                                  />
                                  <h3 className="companyinvite weight-500">
                                    {invite.company_name}
                                  </h3>
                                </div>
                                <p className="notification-message m-0 deeppurple weight-500">
                                  You have been invited to join{" "}
                                  {invite.company_name}
                                </p>
                              </div>
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <p className="notification-message weight-400 m-0 deeppurple">
                                  Received at:{" "}
                                  {new Date(
                                    invite.created_at
                                  ).toLocaleDateString()}
                                </p>
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    onClick={() => handleAccept(invite.company)}
                                    className="accept_btn"
                                  >
                                    <span className="weight-500">Accept</span>
                                  </button>
                                  <button
                                    onClick={() => handleReject(invite.company)}
                                    className="reject_btn"
                                  >
                                    <span className="weight-500">Reject</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModel;
