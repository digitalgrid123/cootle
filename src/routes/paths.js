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
};

export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  createcompany: {
    root: path(ROOTS_DASHBOARD, "/createcompany"),
    edit: path(ROOTS_DASHBOARD, "/edit"),
  },

  surgeries: {
    root: path(ROOTS_DASHBOARD, "/surgeries"),
    addSurgery: path(ROOTS_DASHBOARD, "/surgeries/addSurgery"),
    view: (id) => path(ROOTS_DASHBOARD, `/surgeries/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/surgeries/${id}/edit`),
  },
};
