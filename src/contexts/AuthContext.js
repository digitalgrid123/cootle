"use client";

import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
// utils
import { STORAGE_KEYS, USER_ROLES } from "@/constants/keywords";
import { useSetting } from "@/hooks";
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
import { getRole } from "@/utils/helper";
import { setSession } from "@/utils/jwt";
import { getData, getSessionIdFromCookies, saveData } from "@/utils/storage";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { setSelectedCompany } from "@/utils/globalState";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};
let userData = null;

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGNUP: (state, action) => {
    const { userData } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      userData,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  UPDATE: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  VerifyEmail: () => Promise.resolve(),
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
      setSession(null);
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    } catch (error) {}
  };

  const handleTokenExpiration = async () => {
    try {
      const rT = getData(STORAGE_KEYS.AUTH_REFRESH_TOKEN);

      const res = await axiosPost(API_ROUTER.REFRESH_TOKEN, {
        refresh: rT,
      });

      if (res.status) {
        setSession(res?.access, rT, handleTokenExpiration, handleRTExpiration);

        // After successful token refresh, retrieve user info again
        const userInfoResponse = await axiosGet(API_ROUTER.USER_INFO);
        if (userInfoResponse.status) {
          dispatch({
            type: "UPDATE",
            payload: {
              user: userInfoResponse.data,
            },
          });
        }
      } else {
        // Handle refresh token failure
        handleRTExpiration();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle refresh token error
      handleRTExpiration();
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getData(STORAGE_KEYS.AUTH_TOKEN);
        const refreshToken = getData(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
        const localAuth = getData(STORAGE_KEYS.AUTH);

        if (accessToken && localAuth) {
          setSession(
            accessToken,
            refreshToken,
            handleTokenExpiration,
            handleRTExpiration
          );

          const userInfoResponse = await axiosGet(API_ROUTER.USER_INFO);
          if (userInfoResponse.status) {
            saveData(USER_ROLES.SUPER_ADMIN, userInfoResponse.data.is_admin);
            dispatch({
              type: "INITIALIZE",
              payload: { 
                isAuthenticated: true,
                user: userInfoResponse.data,
              },
            });
          } else {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const verifyregisterCode = async (email, verification_code) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.REGISTER_VERIFY, {
          email,
          verification_code,
        });
        const user = {
          email: email,
        };

        if (res.status) {
          const { access, refresh } = res;
          setSession(
            access,
            refresh,
            handleTokenExpiration,
            handleRTExpiration
          );
          saveData(STORAGE_KEYS.AUTH, user);
          dispatch({
            type: "LOGIN",
            payload: {
              user: { ...user },
            },
          });

          resolve({
            status: true,
            data: user,
            message: "successfully register",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: res?.data?.response?.data?.status,
          });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: "" });
      }
    });
  };

  const register = (email) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.REGISTER_EMAIL, {
          email,
        });

        if (res.status) {
          resolve({
            status: true,
            data: "",
            message: "Passcode successfully sent to email.",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: res?.data?.response?.data?.status,
          });
        }
      } catch (error) {
        resolve({
          status: false,
          data: "",
          message: "",
        });
      }
    });
  };

  const login = (email) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.LOGIN_EMAIL, {
          email,
        });

        if (res.status) {
          resolve({
            status: true,
            data: "",
            message: "Passcode successfully sent to email.",
          });
        } else {
          resolve({
            status: false,
            data: "",
            message: "No user exists with this email.",
          });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const userloginverify = async (email, verification_code) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.REGISTER_VERIFY, {
          email,
          verification_code,
        });
        const user = {
          email: email,
        };

        if (res.status) {
          const { access, refresh } = res;
          setSession(
            access,
            refresh,
            handleTokenExpiration,
            handleRTExpiration
          );
          saveData(STORAGE_KEYS.AUTH, user);
          dispatch({
            type: "LOGIN",
            payload: {
              user: { ...user },
            },
          });

          resolve({ status: true, data: user, message: "successfully login" });
        } else {
          resolve({
            status: false,
            data: "",
            message: res?.data?.response?.data?.status,
          });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: "" });
      }
    });
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

  const valueratio = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(API_ROUTER.EFFORT_VALUE_RATIO(project_id), {
        start_date,
        end_date,
      });

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

  const objectiveratio = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(API_ROUTER.OBJECTIVE_VALUE_RATIO(project_id), {
        start_date,
        end_date,
      });

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

  const effortbycategory = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(
        API_ROUTER.EFFORT_BY_CATEGORY_COUNT(project_id),
        {
          start_date,
          end_date,
        }
      );

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
  const latestobjective = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(API_ROUTER.LATEST_OBJECTIVE(project_id), {
        start_date,
        end_date,
      });

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

  const latestvalue = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(API_ROUTER.LATEST_VALUE(project_id), {
        start_date,
        end_date,
      });

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

  const effortgraph = async (project_id, start_date, end_date) => {
    try {
      const res = await axiosGet(API_ROUTER.EFFORT_GRAPH(project_id), {
        start_date,
        end_date,
      });

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

  const mappingachieve =async (mapping_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.MAPPING_ARCHIEVE,{
        mapping_id
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

  const unarchiveObjective =async (mapping_id) => {
    try {
      const res = await axiosPatch(API_ROUTER.MAPPING_UNARCHIEVE,{
        mapping_id
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
        unarchiveObjective
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
