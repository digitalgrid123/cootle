import { USER_ROLES } from "@/constants/keywords";

const getNormalRoute = (path) => `/${path}/`;
const getSurgeonRoute = (path) => `surgeon/${path}/`;
const getUserRoute = (path) => `user/${path}/`;
const getHospitalRoute = (path) => `hospital/${path}`;
const getAdminRoute = (path) => `superadmin/${path}/`;
const getSurgeonUpdateRoute = (path) => `hospital/surgeon/${path}/`;
const getadminRoute = (path) => `superadmin/${path}`;

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

  // HOSPITAL
  GET_SURGERY_TYPES: getHospitalRoute("Surgery-types"),
  SURGERY_TYPE: getHospitalRoute("surgery-type-details/"),
  CREATE_SURGERY_TYPE: getHospitalRoute("add-new-surgery-type/"),

  CREATE_OT_ROOM: getHospitalRoute("create-new-ot/"),
  OT_ROOM_DETAILS: getHospitalRoute("ot-room-details/"),
  GET_OT_ROOMS: getHospitalRoute("it-room-list"),

  GET_SURGEONS: getHospitalRoute("surgeon-list"),
  CREATE_SURGEON: getHospitalRoute("create-new-surgeon/"),
  DELETE_SURGEON: getHospitalRoute("surgeon-soft-delete/"),

  //Aproved Surgeon Request
  GET_APPROVED_SURGEON: getHospitalRoute("approved-surgeon-requests"),

  //REQUESTED
  GET_REQUESTED_SURGEON: getHospitalRoute("pending-surgeon-requests"),

  //HOSPITAL STATS
  STATS_HOSPITAL: getHospitalRoute("today-stats"),

  //STATUS
  STATUS: getHospitalRoute("surgeon"),

  ACCEPT_REQUEST: getHospitalRoute("accept-request/"),

  REJECT_REQUEST: getHospitalRoute("reject-request/"),

  //DELETE SURGEON
  DELETE_SURGEON: getHospitalRoute("delete-surgeon/"),

  //Operations Count
  OPERATION_COUNT: getHospitalRoute("ot-rooms-count"),

  //Total operation count for admin
  ADMIN_OPERATION_COUNT: getadminRoute("otroom/count"),

  //Total Surgeon count for admin
  ADMIN_SURGEON_COUNT: getadminRoute("surgeon/count"),

  //Total SURGERY count for admin
  ADMIN_SURGERY_COUNT: getadminRoute("surgery/count"),

  //Total Hospital count for admin
  ADMIN_HOSPITAL_COUNT: getadminRoute("hospital/count"),

  //Hospitals
  GET_HOSPITALS: getAdminRoute("hospital"),

  //Hospital Logo
  GET_HOSPITALS_LOGO: getHospitalRoute("logo"),

  //Update hospital logo
  UPDATE_HOSPITAL_LOGO: getadminRoute("rebranding/logo"),

  //CREATE HOSPITAL
  CREATE_HOSPITAL_SUPERADMIN: getadminRoute("hospital/create"),

  //Hospitals Dropdown
  GET_HOSPITALS_DROPDOWN: getadminRoute("hospital/dropdown"),
  //SINGLE HOSPITAL STATS
  GET_HOSPITAL_STAT: getAdminRoute("hospital/stats"),

  //ALL HOSPITAL COMPLETED SURGERY GRAPH
  GET_HOSPITAL_COMPLETED_SURGERY: getadminRoute("hospital/surgery/history"),

  //Billing Detail for SuperAdmin
  BILLING_DETAIL: getadminRoute("billing"),

  //GET HOSPITAL PROFILE DATABASE

  //GET HOSPITAL PROFILE DATABASE
  GET_HOSPITALS_DATABASE: getadminRoute("database/hospital"),
  //Get Admin Profile
  ADMIN_PROFILE: getAdminRoute("hospital/admin"),

  //Get Hospital Profile
  HOSPITAL_PROFILE: getAdminRoute("hospital"),

  //Surgeon Count
  SURGEON_COUNT: getHospitalRoute("surgeons-count"),

  //Stop Video Analysis
  STOP_VIDEO_ANALYSIS: getSurgeonRoute("stop-video-analysis"),

  //Surgeries Count
  SURGERIES_COUNT: getHospitalRoute("surgeries-count"),

  //Surgery Type Count
  SURGERY_TYPE_COUNT: getHospitalRoute("surgery-type-count"),

  //Surgery Count By Month
  SURGERY_COUNT_MONTH: getHospitalRoute("surgery-count-by-month"),

  //GET ADMIN SURGERY REPORT
  GET_SURGERY_REPORT: (role) => getRoute(role, "hospital/surgery"),

  // SURGEONS
  UPDATE_ACTIVE_STATUS: (role, selectedId) =>
    getSurgeonUpdateRoute(`${selectedId}/active-status`),

  CREATE_SURGERY: getSurgeonRoute("create-surgery"),

  //Video Analysis List
  GET_VIDEO_ANALYSIS_LIST: (role) => getRoute(role, "video-analysis-list"),

  //Video Analysis List By ID
  GET_VIDEO_ANALYSIS_DETAIL: (role) => getRoute(role, "video-analysis"),

  //Hospital list
  GET_HOSPITAL_LIST: getSurgeonRoute("hospital-list"),

  //Surgery Stats
  GET_SURGEONS_STATS: getHospitalRoute("surgery-stats"),

  //Invite Hospital
  INVITE_HOSPITAL: getSurgeonRoute("hospital-request-signup"),

  //Create Hospital
  CREATE_HOSPITAL: getHospitalRoute("hospital-add/"),

  //Request Hospital
  REQUEST_HOSPITAL: getSurgeonRoute("hospital-request"),

  //Update Hospital
  UPDATE_HOSPITAL: getSurgeonRoute("update-license"),

  // SURGEON DASHBOARD
  GET_SURGERY_AVERAGE_COUNT: getSurgeonRoute("avg-count-by-surgery-type"),
  GET_RECENT_SURGERY: getSurgeonRoute("recent-surgery"),
  GET_SURGERY_STATUS_DETAIL: getSurgeonRoute("surgery-status-detail"),
  GET_SURGERY_FULL_YEAR_DETAIL: getSurgeonRoute("full-year-surgery-detail"),
  SEARCH_SURGERIES: getSurgeonRoute("search-surgery-list"),

  // COMMON
  GET_SURGERIES: (role) => getRoute(role, "surgery-list"),
  GET_SURGERY: (role) => getRoute(role, "surgery-details"),
  GET_CALENDER_SURGERIES: (role) => getRoute(role, "calender-surgery-list"),
  UPDATE_PARTIAL_SURGERY: (role) => getRoute(role, "update-surgery"),

  // NOTIFICATIONS
  GET_NOTIFICATIONS: getNormalRoute("notifications"),
  GET_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  UPDATE_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  PARTIAL_UPDATE_MARK_AS_READ: getUserRoute("notification/mark-as-read"),
  DELETE_MARK_AS_READ: getNormalRoute("notifications/remove"),
  DELETE_ALL_MARK_AS_READ: getNormalRoute("notifications/remove-all"),

  // SURGEON DASHBOARD

  // COMMENT
  ADD_COMMENT: getSurgeonRoute("add-comment"),
  DELETE_COMMENT: getSurgeonRoute("remove-comment"),

  SHARE_SURGERY: getSurgeonRoute("share-report-url"),
};
