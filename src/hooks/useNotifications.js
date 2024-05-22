"use client";

import { useEffect } from "react";
import useMetaData from "./useMetaData";
import useToaster from "./useToaster";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosDelete, axiosPatch } from "@/services/axiosHelper";

const useNotifications = () => {
  // Hooks
  const [notifications, isLoading, fetchData] = useMetaData(
    API_ROUTER.GET_NOTIFICATIONS
  );
  const { toaster } = useToaster();

  // Effects
  useEffect(() => {
    const sub = setInterval(() => fetchData({}), [20000]);
    return () => clearInterval(sub);
  }, []);

  // Handlers
  const clearAll = async () => {
    if (!notifications || !notifications.length) return;
    try {
      await Promise.all(
        notifications.map(async ({ id }) => {
          await axiosDelete(`${API_ROUTER.DELETE_MARK_AS_READ}${id}/`);
        })
      );
      fetchData({});
    } catch (error) {}
  };

  const markAsRead = async (notificationId, is_read) => {
    try {
      if (!notificationId) return;
      const res = await axiosPatch(
        `${API_ROUTER.UPDATE_MARK_AS_READ}${notificationId}/`,
        {
          is_read: !is_read,
        }
      );
      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(TOAST_ALERTS.NOTIFICATION_UPDATE_SUCCESS, TOAST_TYPES.SUCCESS);
        fetchData({});
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const res = await axiosDelete(`${API_ROUTER.DELETE_MARK_AS_READ}${id}/`);
      if (!res.status) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      if (res.status) {
        toaster(TOAST_ALERTS.NOTIFICATION_DELETED_SUCCESS, TOAST_TYPES.SUCCESS);
        fetchData({});
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return {
    notifications,
    isLoading,
    count:
      notifications && notifications.length > 0
        ? notifications.filter(({ is_read }) => !is_read)?.length
        : 0,
    clearAll,
    markAsRead,
    deleteNotification,
  };
};

export default useNotifications;
