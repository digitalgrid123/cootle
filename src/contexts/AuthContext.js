"use client";

import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
// utils
import { STORAGE_KEYS, USER_ROLES } from "@/constants/keywords";
import { API_ROUTER } from "@/services/apiRouter";
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPatchFile,
  axiosPost,
  axiosPostFile,
  axiosPut,
  axiosPutFile,
} from "@/services/axiosHelper";
import axiosInstance from "@/utils/axios";
import { setSession } from "@/utils/jwt";
import { getData, saveData } from "@/utils/storage";
import axios from "axios";

import { setSelectedCompany } from "@/utils/globalState";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  accessToken: null,
  refreshToken: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, accessToken, refreshToken } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      accessToken,
      refreshToken,
    };
  },
  LOGIN: (state, action) => {
    const { accessToken, refreshToken } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      accessToken,
      refreshToken,
    };
  },
  REGISTER: (state, action) => {
    const { accessToken, refreshToken } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      accessToken,
      refreshToken,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  }),
  UPDATE_TOKENS: (state, action) => {
    const { accessToken, refreshToken } = action.payload;
    return {
      ...state,
      accessToken,
      refreshToken,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  verifyregisterCode: () => Promise.resolve(),
  userloginverify: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  update: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  ForgotPasswordOTP: () => Promise.resolve(),
  ForgotPassword: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [company, setcompany] = useState();
  const [useradd, setuseradd] = useState();

  const handleRTExpiration = async () => {
    try {
      clearSession();
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        },
      });
    } catch (error) {
      console.error("Failed to handle refresh token expiration", error);
    }
  };

  const handleTokenExpiration = async () => {
    try {
      const refreshToken = getData(STORAGE_KEYS.AUTH_REFRESH_TOKEN);

      if (!navigator.onLine) {
        window.addEventListener("online", async () => {
          const res = await attemptTokenRefresh(refreshToken);
          if (res) {
            setSession(
              res.access,
              res.refresh,
              handleTokenExpiration,
              handleRTExpiration
            );
            dispatch({
              type: "UPDATE_TOKENS",
              payload: {
                accessToken: res.access,
                refreshToken: res.refresh,
              },
            });
          } else {
            handleRTExpiration();
          }
        });
        return;
      }

      const res = await attemptTokenRefresh(refreshToken);
      if (res) {
        setSession(
          res.access,
          res.refresh,
          handleTokenExpiration,
          handleRTExpiration
        );
        dispatch({
          type: "UPDATE_TOKENS",
          payload: {
            accessToken: res.access,
            refreshToken: res.refresh,
          },
        });
      } else {
        handleRTExpiration();
      }
    } catch (error) {
      console.error("Failed to handle token expiration", error);
    }
  };

  const attemptTokenRefresh = async (refreshToken) => {
    try {
      const res = await axiosPost(API_ROUTER.REFRESH_TOKEN, {
        refresh: refreshToken,
      });
      return res.status ? res : null;
    } catch (error) {
      console.error("Token refresh failed", error);
      return null;
    }
  };

  const initialize = async () => {
    try {
      const accessToken = getData(STORAGE_KEYS.AUTH_TOKEN);
      const refreshToken = getData(STORAGE_KEYS.AUTH_REFRESH_TOKEN);

      if (accessToken && refreshToken) {
        setSession(
          accessToken,
          refreshToken,
          handleTokenExpiration,
          handleRTExpiration
        );
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            accessToken,
            refreshToken,
          },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        },
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = async (email) => {
    try {
      const res = await axiosPost(API_ROUTER.LOGIN_EMAIL, { email });

      if (res.status) {
        return { status: true, message: "Login code sent to your email." };
      } else {
        return {
          status: false,
          message: res.message || "Failed to send login code.",
        };
      }
    } catch (error) {
      return { status: false, message: error.message || "An error occurred" };
    }
  };

  const userloginverify = async (email, verification_code) => {
    try {
      const res = await axiosPost(API_ROUTER.REGISTER_VERIFY, {
        email,
        verification_code,
      });

      if (res.status) {
        setSession(
          res.access,
          res.refresh,
          handleTokenExpiration,
          handleRTExpiration
        );
        dispatch({
          type: "LOGIN",
          payload: {
            accessToken: res.access,
            refreshToken: res.refresh,
          },
        });
        return { status: true, message: "Successfully logged in" };
      } else {
        return { status: false, message: res.message || "Verification failed" };
      }
    } catch (error) {
      return { status: false, message: error.message || "An error occurred" };
    }
  };

  const register = async (email) => {
    try {
      const res = await axiosPost(API_ROUTER.REGISTER_EMAIL, { email });

      if (res.status) {
        return {
          status: true,
          message: "Registration code sent to your email.",
        };
      } else {
        return {
          status: false,
          message: res.message || "Failed to send registration code.",
        };
      }
    } catch (error) {
      return { status: false, message: error.message || "An error occurred" };
    }
  };

  const verifyregisterCode = async (email, verification_code) => {
    try {
      const res = await axiosPost(API_ROUTER.REGISTER_VERIFY, {
        email,
        verification_code,
      });

      if (res.status) {
        setSession(
          res.access,
          res.refresh,
          handleTokenExpiration,
          handleRTExpiration
        );
        dispatch({
          type: "REGISTER",
          payload: {
            accessToken: res.access,
            refreshToken: res.refresh,
          },
        });
        return { status: true, message: "Successfully registered" };
      } else {
        return { status: false, message: res.message || "Verification failed" };
      }
    } catch (error) {
      return { status: false, message: error.message || "An error occurred" };
    }
  };

  const updateuser = async (fullname, profile_pic) => {
    return new Promise(async (resolve) => {
      try {
        const formData = new FormData();
        formData.append("fullname", fullname);

        // Check if profile_pic is a file
        if (profile_pic instanceof File) {
          formData.append("profile_pic", profile_pic);
        } else if (profile_pic === null) {
          formData.append("profile_pic", ""); // Indicate removal
        }

        const res = await axiosPutFile(
          API_ROUTER.UPDATE_USER,
          formData,
          profile_pic instanceof File ? profile_pic : undefined
        );

        if (res.status) {
          resolve({ status: true, data: "", message: "User Added" });
        } else {
          resolve({ status: false, data: "", message: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: "" });
      }
    });
  };

  const userinfo = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.USER_INFO);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const userinfobyId = async (user_id) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.USER_INFO_ID(user_id));

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const createcompany = async (name, logo) => {
    return new Promise(async (resolve) => {
      try {
        const formData = new FormData();
        formData.append("name", name);

        // Check if logo is a file
        if (logo instanceof File) {
          formData.append("logo", logo);
        }

        const res = await axiosPostFile(
          API_ROUTER.COMPANY_CREATED,
          formData,
          logo instanceof File ? logo : undefined
        );

        if (res.status) {
          resolve({
            status: true,
            data: "",
            message: "Company Created Successfully",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: res?.data?.response?.data?.name[0],
          });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: "" });
      }
    });
  };

  const companylist = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.COMPANY_LIST);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    setSelectedCompany(null); // Clear selected company on logout
  };

  const inviteuser = (emails) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.INVITE_USER, {
          emails,
        });

        if (res.status) {
          resolve({
            status: true,
            data: "",
            message: "User Invite Successfully",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: "Already send invitation to this User",
          });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const companyset = (id) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.COMPANY_SET, {
          company_id: id,
        });

        if (res.status) {
          resolve({ status: true, data: res });
          saveData(STORAGE_KEYS.SESSION, res.session_id);
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const checkmember = (id) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.CHECK_MEMBERSHIP, {
          current_company_id: id,
        });

        if (res.status) {
          // Assume saveData function saves the role and is_admin status
          saveData(USER_ROLES.SUPER_ADMIN, res.data.is_admin);

          // Retrieve previous is_admin state
          let prevIsAdmin = localStorage.getItem("prevIsAdmin") === "true";

          // Check if current is_admin state is different from previous state
          if (res.data.is_admin !== prevIsAdmin) {
            initialize();
          }

          // Update prevIsAdmin in localStorage with current is_admin state
          localStorage.setItem("prevIsAdmin", res.data.is_admin);

          resolve({ status: true, data: res });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const editcompany = (name, logo) => {
    return new Promise(async (resolve) => {
      try {
        const formData = new FormData();
        formData.append("name", name);

        // Check if logo is a file
        if (logo instanceof File) {
          formData.append("logo", logo);
        } else if (logo === "") {
          formData.append("logo", ""); // Indicate removal
        }

        const res = await axiosPutFile(
          API_ROUTER.COMPANY_EDIT,
          formData,
          logo instanceof File ? logo : undefined
        );

        if (res.status) {
          resolve({
            status: true,
            data: "",
            message: "Company Updated Successfully",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: res?.data?.response?.data?.name[0],
          });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: "" });
      }
    });
  };

  const acceptuser = (email, token) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.ACCEPT_USER, {
          token,
          email,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Invitation accept Successfully",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const invitation = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.INVITATION);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const acceptinvite = (company) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.ACCEPT_INVITE, {
          company,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Invitation accept Successfully",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const acceptreject = (company) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.REJECT_INVITE, {
          company,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Invitation Rejected Successfully",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const member = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.INVITATION_USER);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const removeMember = async (memberId) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosDelete(API_ROUTER.REMOVE_MEMBER, {
          member_id: memberId,
        }); // Pass memberId in the request payload
        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Member Removed",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const categories = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.GET_CATEGORIES);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const getSinglecategory = async (category_id) => {
    try {
      const url = `${API_ROUTER.GET_CATEGORIES}${category_id}${API_ROUTER.DESIGN_EFFORT}`;
      const res = await axiosGet(url);

      if (res.status) {
        return { status: true, data: res.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      console.error("Error in getSinglecategory:", error);
      return { status: false, data: "" };
    }
  };

  const designEffort = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosGet(API_ROUTER.DESIGN_EFFORT);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const mappingList = (type) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.MAPPING_LIST, {
          type,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res,
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const createmapping = (name, description, type) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.CREATE_MAPPING, {
          title: name,
          description,
          type,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const createcategory = (name) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.CREATE_CATEGORY, {
          name,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Category Created Successfully",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const createDesignEffort = (category_id, description, title) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.CREATE_DESIGN_EFFORT, {
          category_id,
          description,
          title,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Effort Created Successfully",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const updatemapping = (id, name, description, type) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPatch(API_ROUTER.MAPPING_UPDATE, {
          mapping_id: id,
          title: name,
          description,
          type,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const updateDesignEffort = async (name, description, effort_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.UPDATE_DESIGN_EFFORT, {
        title: name,
        description,
        effort_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const removeCategory = async (category_id) => {
    try {
      const res = await axiosDelete(API_ROUTER.DELETE_CATEGORY, {
        category_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const addEffortByMapping = async (effort_id, mapping_id, type) => {
    try {
      const res = await axiosPost(API_ROUTER.ADD_EFFORT_BY_MAPPING, {
        mapping_id,
        effort_id,
        type,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const removeEffortByMapping = async (effort_id, mapping_id, type) => {
    try {
      const res = await axiosDelete(API_ROUTER.REMOVE_EFFORT_BY_MAPPING, {
        mapping_id,
        effort_id,
        type,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const reteriveEffort = async (design_effort_ids) => {
    try {
      const res = await axiosPost(API_ROUTER.RETERIVE_EFFORT_BY_IDS, {
        design_effort_ids,
      });

      if (res.status) {
        return {
          status: true,
          data: res,
        };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const defaultmapping = async (json_file) => {
    try {
      const res = await axiosPostFile(API_ROUTER.DEFAULT_MAPPING, json_file);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const getdefaultmapping = async () => {
    try {
      const res = await axiosGet(API_ROUTER.DEFAULT_MAPPING);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const projectlist = async () => {
    try {
      const res = await axiosGet(API_ROUTER.PROJECT_LIST);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const purposelist = async (project_id) => {
    try {
      const res = await axiosGet(API_ROUTER.PURPOSE_LIST(project_id));

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const effortList = async (project_id) => {
    try {
      const res = await axiosGet(API_ROUTER.EFFORT_LIST(project_id));

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const memberslist = async () => {
    try {
      const res = await axiosGet(API_ROUTER.MEMBERS_LIST);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const resetmapping = async () => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.RESET_MAPPING);

        if (res.status) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const createProject = async (name) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.CREATE_PROJECT, {
          name,
        });

        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Project added successfully",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: "Failed to add project",
          });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const createPurpose = async (
    title,
    description,
    project_id,
    desired_outcomes,
    design_efforts
  ) => {
    try {
      const res = await axiosPost(API_ROUTER.CREATE_PURPOSE, {
        title,
        description,
        project_id,
        desired_outcomes,
        design_efforts,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
          message: "Purpose added successfully",
        };
      } else {
        return {
          status: false,
          data: "",
          message: "Failed to add purpose",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const createProjecteffort = async (
    project_id,
    links,
    purpose,
    outcomes,
    design_effort
  ) => {
    try {
      const res = await axiosPost(API_ROUTER.CREATE_PROJECT_EFFORT, {
        project_id,
        links,
        purpose,
        outcomes,
        design_effort,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
          message: "Purpose added successfully",
        };
      } else {
        return {
          status: false,
          data: "",
          message: "Failed to add purpose",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const updatePurpose = async (
    title,
    description,
    purpose_id,
    desired_outcomes,
    design_efforts
  ) => {
    try {
      const res = await axiosPatch(API_ROUTER.EDIT_PURPOSE, {
        title,
        description,
        purpose_id,
        desired_outcomes,
        design_efforts,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const updateEffort = async (
    project_effort_id,
    links,
    purpose,
    outcomes,
    design_effort
  ) => {
    try {
      const res = await axiosPatch(
        API_ROUTER.UPDATE_EFFORT(project_effort_id),
        {
          links,
          purpose,
          outcomes,
          design_effort,
        }
      );

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  const removePurpose = async (purpose_id) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosDelete(API_ROUTER.REMOVE_PURPOSE, {
          purpose_id,
        }); // Pass memberId in the request payload
        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Member Removed",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const removeEffort = async (project_effort_id) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosDelete(
          API_ROUTER.REMOVE_EFFORT(project_effort_id)
        );
        if (res.status) {
          resolve({
            status: true,
            data: res.data,
            message: "Member Removed",
          });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const buildQueryString = (params) => {
    const query = new URLSearchParams();

    // Add parameters to the query string only if they are not null, undefined, or empty strings
    if (params.year) query.append("year", params.year);
    if (params.period) query.append("period", params.period);
    if (
      params.offset !== null &&
      params.offset !== undefined &&
      params.offset !== ""
    ) {
      query.append("offset", params.offset);
    }

    return query.toString();
  };

  const valueratio = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });

      const url = `${API_ROUTER.EFFORT_VALUE_RATIO(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const objectiveratio = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });
      const url = `${API_ROUTER.OBJECTIVE_VALUE_RATIO(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const effortbycategory = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });
      const url = `${API_ROUTER.EFFORT_BY_CATEGORY_COUNT(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const latestobjective = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });
      const url = `${API_ROUTER.LATEST_OBJECTIVE(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const latestvalue = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });
      const url = `${API_ROUTER.LATEST_VALUE(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const effortgraph = async (
    project_id,
    year = "",
    period = "",
    offset = ""
  ) => {
    try {
      const queryString = buildQueryString({ year, period, offset });
      const url = `${API_ROUTER.EFFORT_GRAPH(project_id)}${
        queryString ? "?" + queryString : ""
      }`;

      const res = await axiosGet(url);

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return { status: false, data: res.data || "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const effortcheckedBy = async (project_effort_id, value_status) => {
    try {
      const res = await axiosPatch(
        API_ROUTER.EFFORT_CHECKED_BY(project_effort_id),
        {
          value_status,
        }
      );

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  const assignAdmin = async (user_id) => {
    try {
      const res = await axiosPut(API_ROUTER.ASSIGN_ADMIN(user_id));

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const unassignAdmin = async (user_id) => {
    try {
      const res = await axiosPut(API_ROUTER.UNASSIGN_ADMIN(user_id));

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const removeinvitation = async (invitation_id) => {
    try {
      const res = await axiosDelete(
        API_ROUTER.REMOVE_NOTIFICATION(invitation_id)
      );

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const mappingachieve = async (mapping_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.MAPPING_ARCHIEVE, {
        mapping_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const unarchiveObjective = async (mapping_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.MAPPING_UNARCHIEVE, {
        mapping_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  const effortachieve = async (effort_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.EFFORT_ARCHIEVE, {
        effort_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  const effortunarchieve = async (effort_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.EFFORT_UNARCHIEVE, {
        effort_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };

  const deleteProject = async (project_id) => {
    try {
      const res = await axiosDelete(API_ROUTER.DELETE_PROJECT, {
        project_id,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      console.error("Error creating purpose:", error);
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  const updateProject = async (project_id, name) => {
    try {
      const res = await axiosPatch(API_ROUTER.UPDATE_PROJECT, {
        project_id,
        name,
      });

      if (res.status) {
        return {
          status: true,
          data: res.data,
        };
      } else {
        return {
          status: false,
          data: "",
        };
      }
    } catch (error) {
      return {
        status: false,
        data: "",
        message: "An error occurred while adding purpose",
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        verifyregisterCode,
        login,
        userloginverify,
        updateuser,
        userinfo,
        createcompany,
        companylist,
        company,
        setcompany,
        useradd,
        setuseradd,
        logout,
        inviteuser,
        companyset,
        editcompany,
        acceptuser,
        invitation,
        acceptinvite,
        acceptreject,
        member,
        removeMember,
        categories,
        mappingList,
        createmapping,
        updatemapping,
        designEffort,
        createcategory,
        createDesignEffort,
        getSinglecategory,
        updateDesignEffort,
        removeCategory,
        removeEffortByMapping,
        addEffortByMapping,
        reteriveEffort,
        defaultmapping,
        resetmapping,
        getdefaultmapping,
        createProject,
        projectlist,
        purposelist,
        createPurpose,
        updatePurpose,
        removePurpose,
        createProjecteffort,
        effortList,
        updateEffort,
        removeEffort,
        valueratio,
        objectiveratio,
        effortbycategory,
        latestobjective,
        latestvalue,
        effortcheckedBy,
        memberslist,
        effortgraph,
        userinfobyId,
        assignAdmin,
        mappingachieve,
        unarchiveObjective,
        effortachieve,
        effortunarchieve,
        unassignAdmin,
        checkmember,
        removeinvitation,
        deleteProject,
        updateProject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
