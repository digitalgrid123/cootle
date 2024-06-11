import React, { useCallback, useState, useEffect, useRef } from "react";
import Title from "@/components/Dashboard/Title";
import { useNotifications } from "@/hooks";
import { Loader } from "@/components/shared/loader";
import InvitationList from "./InvitationList";

const NotificationModel = ({
  isDropdownOpen,
  setDropdownOpen,
  dropdownRef,
}) => {
  const { notifications, isLoading, clearAll } = useNotifications();
  const [showInvite, setShowInvite] = useState(false);
  const notificationModelRef = useRef(null);

  const handleShowInvite = useCallback(() => {
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

  const safeNotifications = notifications || [];

  return (
    (isDropdownOpen || showInvite) && (
      <div ref={dropdownRef} className="invitation-overlay">
        <div
          ref={notificationModelRef}
          className="invitation-content"
          style={{ flex: "0" }}
        >
          <div className="h-100 d-flex flex-column c">
            <div className="mb-20">
              <Title title="Notifications" />
            </div>

            <div className="notification-container">
              <div className="w-100 d-flex justify-content-end mb-20 plr-14 gap-4">
                <button className="save-btn" onClick={handleShowInvite}>
                  <span>See All Invitations</span>
                </button>
                <button
                  className="save-btn"
                  onClick={clearAll}
                  disabled={isLoading}
                >
                  <span>Mark All as Read</span>
                </button>
              </div>
              {isLoading ? (
                <Loader />
              ) : safeNotifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                safeNotifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center justify-content-between notification-item border_bottom_Semi-Transparent_navy plr-14 pb-20 ${
                      notification.is_read ? "read" : "unread"
                    }`}
                  >
                    <p className="menutext weight-500 m-0">
                      {notification.message}
                    </p>
                    <p className="menutext weight-500 m-0">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {showInvite && (
          <InvitationList
            onClose={() => setShowInvite(false)}
            showInvite={showInvite}
            setShowInvite={setShowInvite}
          />
        )}
      </div>
    )
  );
};

export default NotificationModel;
