import { ALL_ROLES, USER_ROLES, USER_ROLES_MAPPER } from "./keywords";
import { PATH_DASHBOARD } from "@/routes/paths";

export const LOGOUT_KEY = 9999;

export const NAV_CONFIG = [
  {
    id: 11,
    title: "Dashboard",
    path: PATH_DASHBOARD.root,
    icon: "bx-category",
    roles: ALL_ROLES,
  },
  {
    id: 12,
    title: "Calendar",
    path: PATH_DASHBOARD.calender.root,
    icon: "bx-calendar",
    roles: [USER_ROLES.HOSPITAL, USER_ROLES.SURGEON],
  },
  {
    id: 22,
    title: "Analytics",
    path: PATH_DASHBOARD.analytics,
    icon: "bx bx-bar-chart-alt-2",
    roles: [USER_ROLES.SURGEON],
  },

  {
    id: 13,
    title: "My Surgeries",
    path: PATH_DASHBOARD.surgeries.root,
    icon: "bx-plus-circle",
    roles: [USER_ROLES.SURGEON],
  },
  {
    id: 21,
    title: "Surgeries",
    path: PATH_DASHBOARD.surgeries.root,
    icon: "bx-plus-circle",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 22,
    title: "Analytics",
    path: PATH_DASHBOARD.analytics,
    icon: "bx bx-bar-chart-alt-2",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 20,
    title: "Surgery Types",
    path: PATH_DASHBOARD.surgeryNames.root,
    icon: "bx-plus-circle",
    roles: [USER_ROLES.HOSPITAL, USER_ROLES.SURGEON],
  },
  {
    id: 14,
    title: "User Management",
    path: PATH_DASHBOARD.usersManagement,
    icon: "bx bx-user-circle",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 15,
    title: "Operation Theater",
    path: PATH_DASHBOARD.operationTheater.root,
    icon: "bx bx-home-heart",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 16,
    title: "Subscription",
    path: PATH_DASHBOARD.subscription,
    icon: "bx bx-calendar-check",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 17,
    title: "Payment",
    path: PATH_DASHBOARD.payment,
    icon: "bx bx-dollar-circle",
    roles: [USER_ROLES.HOSPITAL],
  },
  {
    id: 18,
    title: "Hospitals",
    path: PATH_DASHBOARD.hospitals.root,
    icon: "bx bx-building-house",
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  {
    id: 19,
    title: "Billings",
    path: PATH_DASHBOARD.billings.root,
    icon: "bx bx-detail",
    roles: [USER_ROLES.SUPER_ADMIN],
  },
];

export const NAV_CONFIG_BOTTOM = [
  {
    id: 41,
    title: "My Profile",
    path: PATH_DASHBOARD.myProfile,
    icon: "bx-user",
  },
  {
    id: LOGOUT_KEY,
    title: "Log out",
    path: "#",
    icon: "bx-exit",
  },
  {
    id: 42,
    title: "Rebranding",
    path: PATH_DASHBOARD.reBranding,
    icon: "bx-refresh",
  },

  {
    id: 43,
    title: "FAQs",
    path: PATH_DASHBOARD.FAQ, // Provide the correct href for the document
    icon: "bx-help-circle",
  },
];
export const SURGERY_STATUS = [
  {
    label: "Scheduled",
    value: "scheduled",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Canceled",
    value: "canceled",
  },
];

export const COMPLETED_SURGERY_YEAR_FILTER = [
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 },
];

export const COMPLETED_SURGERY_YEAR_FILTER_TYPES = [
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year" },
];

export const COMPLETED_SURGERY_VIEW_FILTER_TYPES = [
  { label: "All", value: "all" },
  { label: "Ot's", value: "ot" },
  { label: "Completed", value: "completed" },
];

export const SURGERY_STAFFS = [
  { value: "surgeon", label: "Surgeon" },
  { value: "anesthesiologist", label: "Anesthesiologist" },
  { value: "nurses", label: "Nurses" },
  { value: "scrubNurse", label: "Scrub Nurse" },
  { value: "surgicalAssistants", label: "Surgical Assistants" },
  { value: "anesthesiaTechnician", label: "Anesthesia Technician" },
  { value: "biomedicalTechnicians", label: "Biomedical Technicians" },
  { value: "radiologyTechnicians", label: "Radiology Technicians" },
];

export const LOGIN_ROLES = [
  {
    value: USER_ROLES.HOSPITAL,
    label: USER_ROLES_MAPPER[USER_ROLES.HOSPITAL],
    icon: "bx bx-building-house",
  },
  {
    value: USER_ROLES.SURGEON,
    label: USER_ROLES_MAPPER[USER_ROLES.SURGEON],
    icon: "bx bx-user",
  },
];

export const GENDER_ITEMS = [
  { id: 11, label: "Male", value: "male" },
  { id: 12, label: "Female", value: "female" },
  { id: 13, label: "Other", value: "other" },
];

export const MONTH_LIST = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];
