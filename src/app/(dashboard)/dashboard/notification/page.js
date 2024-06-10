"use client";
import React from "react";
import Title from "@/components/Dashboard/Title";
import { useNotifications } from "@/hooks"; // Make sure the path is correct
import { Loader } from "@/components/shared/loader";

const Notification = () => {
  const { notifications, isLoading, clearAll } = useNotifications();

  // Ensure notifications is always an array
  const safeNotifications = notifications || [];

  return (
    <div className="h-100 d-flex flex-column">
      <div className="mb-20">
        <Title title="Notifications" />
      </div>

      <div className="invitation-content">
        <div className="wrapper-company">
          <div className="notification-container">
            <div className="w-100 d-flex justify-content-end mb-20 plr-14">
              <button
                className="save-btn"
                onClick={clearAll}
                disabled={isLoading}
              >
                <span>Mark All as Read</span>
              </button>
            </div>
            {isLoading ? (
              <>
                <Loader />
              </>
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
                  <p className="menutext  weight-500 m-0">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
