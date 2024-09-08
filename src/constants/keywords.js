export const TOAST_ALERTS = {
  LOGIN_SUCCESS: "Login Successfully",
  LOGOUT_SUCCESS: "Logout Successfully",
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
  SESSION: "@SESSION",
  CSRFTOKEN: "@CSRF",
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
