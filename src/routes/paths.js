import { add } from "lodash";

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";
const ROOT = "/";

export const PATH_AUTH = {
  root: ROOT,
  signup: "/signup",
  login: "/login",
  verify: "/verify",
  forgotPassword: "/forgotPassword",
};

export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  createcompany: { root: path(ROOTS_DASHBOARD, "/createcompany") },
  calender: {
    root: path(ROOTS_DASHBOARD, "/calendar"),
    addSchedule: path(ROOTS_DASHBOARD, "/calendar/addSchedule"),
  },
  surgeries: {
    root: path(ROOTS_DASHBOARD, "/surgeries"),
    addSurgery: path(ROOTS_DASHBOARD, "/surgeries/addSurgery"),
    view: (id) => path(ROOTS_DASHBOARD, `/surgeries/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/surgeries/${id}/edit`),
  },
  surgeryNames: {
    root: path(ROOTS_DASHBOARD, "/surgeryNames"),
    add: path(ROOTS_DASHBOARD, "/surgeryNames/add"),
    view: (id) => path(ROOTS_DASHBOARD, `/surgeryNames/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/surgeryNames/${id}/edit`),
  },
  myProfile: path(ROOTS_DASHBOARD, "/myProfile"),
  reBranding: path(ROOTS_DASHBOARD, "/rebranding"),
  FAQ: path(ROOTS_DASHBOARD, "/faq"),
  notifications: path(ROOTS_DASHBOARD, "/notifications"),
  analytics: path(ROOTS_DASHBOARD, "/analytics"),
  analyticsdashboard: path(ROOTS_DASHBOARD, `/analyticsdashboard`),

  // HOSPITAL ADMIN
  operationTheater: {
    root: path(ROOTS_DASHBOARD, "/operationTheater"),
    add: path(ROOTS_DASHBOARD, "/operationTheater/add"),
    view: (id) => path(ROOTS_DASHBOARD, `/operationTheater/${id}`),
  },
  payment: path(ROOTS_DASHBOARD, "/payment"),
  subscription: path(ROOTS_DASHBOARD, "/subscription"),
  usersManagement: path(ROOTS_DASHBOARD, "/usersManagement"),

  // SUPER ADMIN
  billings: {
    root: path(ROOTS_DASHBOARD, "/billings"),
    add: path(ROOTS_DASHBOARD, "/billings/add"),
  },
  hospitals: {
    root: path(ROOTS_DASHBOARD, "/hospitals"),
    add: path(ROOTS_DASHBOARD, "/hospitals/add"),
    update: path(ROOTS_DASHBOARD, "/hospitals/update"),
    analytics: (id) => path(ROOTS_DASHBOARD, `/hospitals/analytics/${id}`),
    view: (id) => path(ROOTS_DASHBOARD, `/hospitals/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/hospitals/${id}/edit`),
  },
};
