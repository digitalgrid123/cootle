import { USER_ROLES } from "@/constants/keywords";

const getNormalRoute = (path) => `/${path}/`;
const getSurgeonRoute = (path) => `surgeon/${path}/`;
const getUserRoute = (path) => `user/${path}/`;
const getHospitalRoute = (path) => `hospital/${path}`;
const getAdminRoute = (path) => `superadmin/${path}/`;

const getRoute = (role, path) => {
  switch (role) {
    case USER_ROLES.SURGEON:
      return getSurgeonRoute(path);
    case USER_ROLES.HOSPITAL:
      return getHospitalRoute(`${path}/`);
    case USER_ROLES.SUPER_ADMIN:
      return getAdminRoute(path);
    default:
      return "";
  }
};

export const API_ROUTER = {
  // AUTH
  LOGIN: (role) => getRoute(role, "login"),
  SIGNUP: (role) => getRoute(role, "signup"),

  VERIFY_CODE: getUserRoute("verify-otp"),
  REFRESH_TOKEN: getNormalRoute("token/refresh"),
  CHANGE_PASSWORD: getUserRoute("change-password"),
  FORGOT_PASSWORD_OTP: getUserRoute("reset-password"),
  FORGOT_PASSWORD: getUserRoute("reset-password/done"),

  //Verify Email
  VERIFY_EMAIL: getUserRoute("verify-email"),
  //REGISTER
  REGISTER_EMAIL: getUserRoute("register"),
  //REGISTER VERIFY
  REGISTER_VERIFY: getUserRoute("verify"),

  //LOGIN VERIFY
  LOGIN_VERIFY: getUserRoute("login/verify"),

  //UPDATE USER
  UPDATE_USER: getUserRoute("update"),

  //COMPANY CREATED
  COMPANY_CREATED: getNormalRoute("company/create"),

  //COMPANY SET
  COMPANY_SET: getNormalRoute("company/set"),

  //ACCEPT USER
  ACCEPT_USER: getNormalRoute("accept"),

  //ACCEPT INVITATION
  ACCEPT_INVITE: getNormalRoute("invite/accept"),

  //REJECT INVITATION
  REJECT_INVITE: getNormalRoute("invite/reject"),

  //ASSIGN AS ADMIN
  ASSIGN_ADMIN: (user_id) => getUserRoute(`${user_id}/membership/admin`),
  UNASSIGN_ADMIN: (user_id) => getUserRoute(`${user_id}/membership/member`),
  REMOVE_NOTIFICATION: (user_id) =>
    getNormalRoute(`invitation/${user_id}/delete`),

  //Mapping_Archieve
  MAPPING_ARCHIEVE: getNormalRoute("mapping/archive"),
  MAPPING_UNARCHIEVE: getNormalRoute("mapping/unarchive"),

  EFFORT_ARCHIEVE: getNormalRoute("design-effort/archive"),
  EFFORT_UNARCHIEVE: getNormalRoute("design-effort/unarchive"),

  //Edit COMPANY
  COMPANY_EDIT: getNormalRoute("company/edit"),
  //COMPANY LIST
  COMPANY_LIST: getNormalRoute("company/list"),

  //Invitation User
  INVITATION: getNormalRoute("invitations"),

  //MEMBER INVIATION LIST
  INVITATION_USER: getNormalRoute("invitations/list"),

  //MEMBER
  MEMBERS_LIST: getNormalRoute("members"),

  //DELETE PROJECT
  DELETE_PROJECT: getNormalRoute("project/delete"),

  //UPDATE PROJECT
  UPDATE_PROJECT: getNormalRoute("project/edit"),

  //REMOVE MEMBER
  REMOVE_MEMBER: getNormalRoute("members/remove"),

  //Categories
  GET_CATEGORIES: getNormalRoute("categories"),
  //Mapping Listing
  MAPPING_LIST: getNormalRoute("mapping/list"),

  //CREATE_MAPPING
  CREATE_MAPPING: getNormalRoute("mapping/create"),

  //MAPPING_UPDATE
  MAPPING_UPDATE: getNormalRoute("mapping/update"),

  //DESIGN EFFORT
  DESIGN_EFFORT: getNormalRoute("design-efforts"),

  //CATEGORY CREATE
  CREATE_CATEGORY: getNormalRoute("category/create"),

  //DESGIN EFFORT CREATED
  CREATE_DESIGN_EFFORT: getNormalRoute("design-effort/create"),

  //GET SINGLE CATEGORY
  GET_SINGLE_CATEGORY: getNormalRoute("category"),

  //UPDATE DESIGN EFFORT CATEGORY
  UPDATE_DESIGN_EFFORT: getNormalRoute("design-effort/update"),

  //Default Value Mapping

  DEFAULT_MAPPING: getNormalRoute("default-mappings"),

  //RESET MAPPING FUNCTIONALITY
  RESET_MAPPING: getNormalRoute("reset-mapping-data"),

  //CREATE PROJECT
  CREATE_PROJECT: getNormalRoute("project/create"),

  //CREATE PURPOSE
  CREATE_PURPOSE: getNormalRoute("purpose/create"),

  //CREATE PROJECT EFFORT
  CREATE_PROJECT_EFFORT: getNormalRoute("project-effort/create"),

  //Edit PURPOSE
  EDIT_PURPOSE: getNormalRoute("purpose/edit"),

  //REMOVE PURPOSE
  REMOVE_PURPOSE: getNormalRoute("purpose/remove"),
  CHECK_MEMBERSHIP: getNormalRoute("membership/check"),

  //Project list
  PROJECT_LIST: getNormalRoute("projects"),

  PURPOSE_LIST: (project_id) =>
    getNormalRoute(`projects/${project_id}/purposes`),

  EFFORT_LIST: (project_id) => getNormalRoute(`projects/${project_id}/efforts`),

  UPDATE_EFFORT: (project_id) =>
    getNormalRoute(`project-effort/${project_id}/edit`),
  REMOVE_EFFORT: (project_id) =>
    getNormalRoute(`project-effort/${project_id}/remove`),

  EFFORT_CHECKED_BY: (project_id) =>
    getNormalRoute(`project-effort/${project_id}/update/value-status`),
  EFFORT_VALUE_RATIO: (project_id) =>
    getNormalRoute(`insights/${project_id}/value-ratio`),

  OBJECTIVE_VALUE_RATIO: (project_id) =>
    getNormalRoute(`insights/${project_id}/objective-ratio`),

  EFFORT_BY_CATEGORY_COUNT: (project_id) =>
    getNormalRoute(`insights/${project_id}/effort-by-category-count`),

  LATEST_OBJECTIVE: (project_id) =>
    getNormalRoute(`insights/${project_id}/latest-objectives`),

  LATEST_VALUE: (project_id) =>
    getNormalRoute(`insights/${project_id}/latest-values`),

  EFFORT_GRAPH: (project_id) =>
    getNormalRoute(`insights/${project_id}/efforts-graph`),

  //DELETE CATEGORY
  DELETE_CATEGORY: getNormalRoute("category/remove"),

  //ADD EFFORT BY MAPPING
  ADD_EFFORT_BY_MAPPING: getNormalRoute("mapping/design-effort/add"),

  //REMOVE EFFORT BY MAPPING
  REMOVE_EFFORT_BY_MAPPING: getNormalRoute("mapping/design-effort/remove"),

  //RETERIVE EFFORT BY ID
  RETERIVE_EFFORT_BY_IDS: getNormalRoute("design-effort/retrieve"),

  //USER INFOR
  USER_INFO_ID: (user_id) => getUserRoute(`info/${user_id}`),

  //USER INFO BY ID

  USER_INFO: getUserRoute("info"),

  //SURGEON

  //LOGOUT

  //LOGIN EMAIL
  LOGIN_EMAIL: getUserRoute("login"),

  //Invite User

  INVITE_USER: getNormalRoute("invite"),

  //SURGEON

  // PROFILE
  GET_USER: getNormalRoute("dashboard"),
  // UPDATE_USER: getUserRoute("user-details"),

  //STATUS
  STATUS: getHospitalRoute("surgeon"),

  ACCEPT_REQUEST: getHospitalRoute("accept-request/"),

  REJECT_REQUEST: getHospitalRoute("reject-request/"),

  //DELETE SURGEON

  // NOTIFICATIONS
  GET_NOTIFICATIONS: getNormalRoute("notifications"),
  GET_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  UPDATE_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  PARTIAL_UPDATE_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  DELETE_MARK_AS_READ: getNormalRoute("notifications/remove"),
  DELETE_ALL_MARK_AS_READ: getNormalRoute("notifications/remove-all"),

  // SURGEON DASHBOARD
};
