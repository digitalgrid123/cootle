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
  project: {
    root: path(ROOTS_DASHBOARD, "/project"),

    view: (id, name) =>
      path(ROOTS_DASHBOARD, `/project/${id}?name=${encodeURIComponent(name)}`),
  },
};
