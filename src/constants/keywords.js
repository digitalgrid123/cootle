export const TOAST_ALERTS = {
  LOGIN_SUCCESS: "Login Successfully",
  LOGOUT_SUCCESS: "Logout Successfully",
  OTP_SENT_SUCCESS: "OTP Sent Successfully",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",

  SURGERY_TYPE_CREATE_SUCCESS: "Surgery-type created successfully",
  SURGERY_TYPE_UPDATE_SUCCESS: "Surgery-type updated successfully",
  SURGERY_CREATE_SUCCESS: "Surgery created successfully!",
  SURGERY_UPDATE_SUCCESS: "Surgery updated successfully!",
  SURGERY_DELETE_SUCCESS: "Surgery deleted successfully!",
  SURGERY_REPORT_SHARED_SUCCESS: "Surgery report shared successfully!",

  REPORT_GENERATED_SUCCESS: "Report is generated and downloaded",
  REPORT_GENERATED_ERROR: "Report is not generated",

  OTROOM_CREATE_SUCCESS: "Operation-Theater created successfully!",
  OTROOM_UPDATE_SUCCESS: "Operation-Theater updated successfully!",
  OTROOM_DELETED_SUCCESS: "Operation-Theater deleted successfully!",

  VIDEO_UPLOAD_SUCCESS: "Video uploaded successfully!",
  VIDEO_SIZE_ALERT: "Video size must be less than 200 MB!",
  VIDEO_LENGTH_ALERT: "Video duration must be less than 5 minutes",

  COMMENT_ADDED_SUCCESS: "Comment added successfully",
  COMMENT_DELETE_SUCCESS: "Comment deleted successfully",

  PROFILE_UPDATE_SUCCESS: "Profile updated successfully",

  NOTIFICATION_UPDATE_SUCCESS: "Notification updated successfully!",
  NOTIFICATION_DELETED_SUCCESS: "Notification deleted successfully!",

  SURGEON_INVITED_SUCCESS: "Surgeon invited successfully",
  SURGEON_DEACTIVATE_SUCCESS: "Surgeon deactivated successfully",
  SURGEON_ACTIVATE_SUCCESS: "Surgeon activated successfully",

  GENERAL_ERROR: "Oops! Something went wrong",
  ANALYSIS_SUCCESS: "Analysis initiated successfully",

  HOSPITAL_CREATE_SUCCESS: "Hospital Added successfully!",
  HOSPITAL_FIELDS: "Oops! Looks like you missed filling in some fields.",

  ADMIN_PROFILE_SUCCESS: "Profile updated successfully",
  ADMIN_PROFILE_FAILED: "Error updating profile",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  WARN: "warn",
  INFO: "info",
  ERROR: "error",
};

export const STORAGE_KEYS = {
  AUTH: "@auth",
  AUTH_TOKEN: "@accessToken",
  AUTH_REFRESH_TOKEN: "@refreshToken",
  SETTINGS: "@settings",
};

export const USER_ROLES = {
  SUPER_ADMIN: "superAdmin",
  HOSPITAL: "hospital",
  SURGEON: "surgeon",
};

export const USER_ROLES_MAPPER = {
  [USER_ROLES.SUPER_ADMIN]: "Super Admin",
  [USER_ROLES.HOSPITAL]: "Hospital Admin",
  [USER_ROLES.SURGEON]: "Surgeon",
};

export const ALL_ROLES = [
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.HOSPITAL,
  USER_ROLES.SURGEON,
];
