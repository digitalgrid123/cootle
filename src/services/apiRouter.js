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

  //Edit COMPANY
  COMPANY_EDIT: getNormalRoute("company/edit"),
  //COMPANY LIST
  COMPANY_LIST: getNormalRoute("company/list"),

  //Invitation User
  INVITATION: getNormalRoute("invitations"),

  //MEMBER INVIATION LIST
  INVITATION_USER: getNormalRoute("invitations/list"),

  //REMOVE MEMBER
  REMOVE_MEMBER: getNormalRoute("members/remove"),

  //USER INFOR
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
  DELETE_MARK_AS_READ: getNormalRoute("notifications/mark-read"),

  // COMMENT
  ADD_COMMENT: getSurgeonRoute("add-comment"),
  DELETE_COMMENT: getSurgeonRoute("remove-comment"),

  SHARE_SURGERY: getSurgeonRoute("share-report-url"),
};
