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

  const [hospitalId, setHospitalId] = useState(null);
  const [change, setChange] = useState(null);
  const [selectedRole, setSelectedRole] = useLocalStorage("selectedRole", 0);

  const { onChangeMode } = useSetting();

  const setHospital = (id) => {
    setHospitalId(id);
  };

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
      }
    } catch (error) {}
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
          const response = await axiosGet(API_ROUTER.USER_INFO);

          if (response.status) {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: {
                  ...response.data,
                  // role: getRole(response.data),
                },
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
          saveData(USER_ROLES.SUPER_ADMIN, res.is_admin);
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
    console.log("🚀 ~ removeMember ~ memberId:", memberId);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
