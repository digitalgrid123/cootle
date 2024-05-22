"use client";

import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
// utils
import { STORAGE_KEYS } from "@/constants/keywords";
import { useSetting } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
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
import { getData, saveData } from "@/utils/storage";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

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
          const response = await axiosGet(API_ROUTER.GET_USER);
          if (response.status) {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: {
                  ...response.data,
                  role: getRole(response.data),
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

  const addHospital = async ({
    name,
    address,
    city,
    state,
    phone,
    zipcode,
    logo,
  }) => {
    try {
      // Retrieve the access token from local storage
      const accessToken = getData(STORAGE_KEYS.AUTH_TOKEN);

      // Include the access token in the headers
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      const apiUrl = process.env.HOST_API + "/" + API_ROUTER.CREATE_HOSPITAL;

      const res = await axios.post(
        apiUrl,
        { name, address, city, state, phone, zipcode, logo },
        { headers }
      );

      if (res.status) {
        saveData(STORAGE_KEYS.AUTH, userData);
        dispatch({
          type: "LOGIN",
          payload: {
            user: { ...userData, role: getRole(userData) },
          },
        });

        // Return the response data
        const responseData = { status: true, data: res?.data.details };

        return responseData;
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const requestHospital = async (hospitals, license_number, license_file) => {
    try {
      const accessToken = getData(STORAGE_KEYS.AUTH_TOKEN);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };
      const apiUrl = process.env.HOST_API + "/" + API_ROUTER.REQUEST_HOSPITAL;

      const res = await axios.post(
        apiUrl,
        { hospitals: hospitals, license_number, license_file },
        {
          headers,
        }
      );

      if (res.status) {
        saveData(STORAGE_KEYS.AUTH, userData);
        dispatch({
          type: "LOGIN",
          payload: {
            user: { ...userData, role: getRole(userData) },
          },
        });

        // Return the response data
        const responseData = { status: true, data: res?.data.details };

        return responseData;
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const updateHospital = async (license_number, license_file) => {
    try {
      const accessToken = getData(STORAGE_KEYS.AUTH_TOKEN);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      const apiUrl = process.env.HOST_API + "/" + API_ROUTER.UPDATE_HOSPITAL;
      const res = await axios.put(
        apiUrl,
        { license_number, license_file },
        {
          headers,
        }
      );

      if (res.status) {
        saveData(STORAGE_KEYS.AUTH, userData);
        dispatch({
          type: "LOGIN",
          payload: {
            user: { ...userData, role: getRole(userData) },
          },
        });

        // Return the response data
        const responseData = { status: true, data: res?.data.details };

        return responseData;
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const signup = async (
    first_name,
    last_name,
    mobile_number,
    email,
    password,
    repeat_password,
    selectedRole = ""
  ) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.SIGNUP(selectedRole), {
          first_name,
          last_name,
          mobile_number,
          email,
          password,
          repeat_password,
        });

        const message = res?.data?.response.data.non_field_errors;

        if (res.status) {
          resolve({ status: true, data: res?.details });
        } else {
          resolve({
            status: false,
            data: "",
            message: message,
          });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: res?.data?.message });
      }
    });
  };

  const login = async (email, password, selectedRole = "") => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.LOGIN(selectedRole), {
          email,
          password,
        });
        const message = res?.data?.response.data.non_field_errors[0];

        if (res.status) {
          resolve({ status: true, data: res?.details });
        } else {
          resolve({ status: false, data: "", message: message });
        }
      } catch (error) {
        resolve({ status: false, data: "", message: message });
      }
    });
  };

  const verifyCode = async (code) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.VERIFY_CODE, {
          code,
        });

        if (res.status) {
          const { access, refresh, user } = res;
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
              user: { ...user, role: getRole(user) },
            },
          });
          onChangeMode("dark");
          resolve({ status: true, data: user });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axiosInstance.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const update = async () => {
    try {
      const response = await axiosGet(API_ROUTER.GET_USER);
      if (response.status) {
        dispatch({
          type: "UPDATE",
          payload: {
            user: { ...response.data, role: getRole(response.data) },
          },
        });
      } else {
        dispatch({
          type: "UPDATE",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {}
  };

  const logout = async () => {
    onChangeMode("light");
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const ForgotPasswordOTP = async (email) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.FORGOT_PASSWORD_OTP, {
          email,
        });
        if (res.status) {
          resolve({ status: true, data: res?.details });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };
  const VerifyEmail = async (code) => {
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.VERIFY_EMAIL, {
          code,
        });

        if (res.status) {
          const { access, refresh, user } = res;
          setSession(
            access,
            refresh,
            handleTokenExpiration,
            handleRTExpiration
          );
          userData = user;

          saveData(STORAGE_KEYS.AUTH, access);

          resolve({ status: true, data: res?.details });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const ForgotPassword = async (code, password, confirm_password) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await axiosPost(API_ROUTER.FORGOT_PASSWORD, {
          code,
          password,
          confirm_password,
        });
        if (res.status) {
          resolve({ status: true, data: res?.details });
        } else {
          resolve({ status: false, data: "" });
        }
      } catch (error) {
        resolve({ status: false, data: "" });
      }
    });
  };

  const stats = async () => {
    try {
      const res = await axiosGet(API_ROUTER.STATS_HOSPITAL);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const operationcount = async (role = "") => {
    try {
      const res = await axiosGet(
        role === "superAdmin"
          ? API_ROUTER.ADMIN_OPERATION_COUNT
          : API_ROUTER.OPERATION_COUNT
      );
      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const surgeoncount = async (role = "") => {
    try {
      const res = await axiosGet(
        role === "superAdmin"
          ? API_ROUTER.ADMIN_SURGEON_COUNT
          : API_ROUTER.SURGEON_COUNT
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const surgeriescount = async (role = "") => {
    try {
      const res = await axiosGet(
        role === "superAdmin"
          ? API_ROUTER.ADMIN_SURGERY_COUNT
          : API_ROUTER.SURGERIES_COUNT
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const HospitalCount = async (role = "") => {
    try {
      const res = await axiosGet(API_ROUTER.ADMIN_HOSPITAL_COUNT);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const surgerytypecount = async () => {
    try {
      const res = await axiosGet(API_ROUTER.SURGERY_TYPE_COUNT);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const surgerycountbymount = async () => {
    try {
      const res = await axiosGet(API_ROUTER.SURGERY_COUNT_MONTH);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const videoanalysislist = async (selectedRole = "") => {
    try {
      const res = await axiosGet(
        API_ROUTER.GET_VIDEO_ANALYSIS_LIST(selectedRole)
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const videoanalysislistbyId = async (id = "", selectedRole = "") => {
    try {
      const res = await axiosGet(
        `${API_ROUTER.GET_VIDEO_ANALYSIS_DETAIL(selectedRole)}${id}`
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const hospitalList = async () => {
    try {
      const res = await axiosGet(API_ROUTER.GET_HOSPITAL_LIST);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const surgeryStats = async () => {
    try {
      const res = await axiosGet(API_ROUTER.GET_SURGEONS_STATS);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const hospitalInvite = async (
    first_name,
    last_name,
    mobile_number,
    email,
    password,
    repeat_password
  ) => {
    try {
      const res = await axiosPut(API_ROUTER.INVITE_HOSPITAL, {
        email,
        password,
        repeat_password,
        first_name,
        last_name,
        mobile_number,
      });

      if (res.status) {
        return { status: true, data: res?.details };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const acceptRequest = async (id = " ") => {
    try {
      const res = await axiosPut(`${API_ROUTER.ACCEPT_REQUEST}${id}/`, {
        id,
      });

      if (res.status === true) {
        return { status: true, message: res?.message };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      cnsole.error(error);
      return { status: false, data: "" };
    }
  };
  const rejectRequest = async (id = " ") => {
    try {
      const res = await axiosPut(`${API_ROUTER.REJECT_REQUEST}${id}/`, {
        id,
      });

      if (res.status === true) {
        return { status: true, data: res.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const deleteSurgeon = async (id = "") => {
    try {
      const res = await axiosPut(`${API_ROUTER.DELETE_SURGEON}${id}/`, {
        id,
      });

      if (res.status === true) {
        return { status: true, data: res.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const StopAnalysis = async (executionArn = "") => {
    try {
      const res = await axiosGet(
        `${API_ROUTER.STOP_VIDEO_ANALYSIS}?executionArn=${executionArn}`
      );

      if (res.status === true) {
        return { status: true, data: res.data.dtails };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const Hospital = async () => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITALS}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const HospitalById = async (id = "") => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITALS}${id}`, {
        id,
      });

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const GetProfile = async (id = "", type = "") => {
    try {
      const res = await axiosGet(
        type === "admin"
          ? `${API_ROUTER.ADMIN_PROFILE}${id}/update`
          : `${API_ROUTER.HOSPITAL_PROFILE}${id}/update`,
        { id }
      );

      if (res.status === true) {
        return { status: true, data: res.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const HospitalDropdown = async () => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITALS_DROPDOWN}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const HospitalDatabase = async () => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITALS_DATABASE}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const updateAdminProfile = async ({
    id,
    email,
    first_name,
    last_name,
    mobile_number,
  }) => {
    try {
      const res = await axiosPatch(`${API_ROUTER.ADMIN_PROFILE}${id}/update`, {
        email,
        first_name,
        last_name,
        mobile_number,
      });

      if (res.status === true) {
        return { status: true, data: res };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const updateHospitalProfile = async ({
    id,
    name,
    contact_number,
    address,
    city,
    state,
    logo,
  }) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("contact_number", contact_number);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);

      // Check if logo is a file
      if (logo instanceof File) {
        formData.append("logo", logo);
      }

      const res = await axiosPatchFile(
        `${API_ROUTER.HOSPITAL_PROFILE}${id}/update`,
        formData,
        logo instanceof File ? logo : undefined // Pass logo only if it's a file
      );

      if (res.status === true) {
        return { status: true, data: res };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const hospitalanalysis = async (id = "", selectedRole = "") => {
    try {
      const res = await axiosGet(
        `${API_ROUTER.GET_SURGERY_REPORT(selectedRole)}${id}`
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const hospitalstats = async (selectedRole = "", id = "") => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITAL_STAT}${id}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const hospitalcompleted = async () => {
    try {
      const res = await axiosGet(
        `${API_ROUTER.GET_HOSPITAL_COMPLETED_SURGERY}`
      );

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const getBilling = async () => {
    try {
      const res = await axiosGet(`${API_ROUTER.BILLING_DETAIL}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const hospitallogo = async () => {
    try {
      const res = await axiosGet(`${API_ROUTER.GET_HOSPITALS_LOGO}`);

      if (res.status) {
        return { status: true, data: res?.data };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };
  const updatelogo = async ({ logo }) => {
    try {
      const formData = new FormData();
      formData.append("logo", logo);
      const res = await axiosPutFile(
        `${API_ROUTER.UPDATE_HOSPITAL_LOGO}`,
        formData
      );

      if (res.status === true) {
        return { status: true, data: res };
      } else {
        return { status: false, data: "" };
      }
    } catch (error) {
      return { status: false, data: "" };
    }
  };

  const createhospital = async (hospitalDataToSend) => {
    try {
      const res = await axiosPostFile(
        `${API_ROUTER.CREATE_HOSPITAL_SUPERADMIN}`,
        hospitalDataToSend
      );

      if (res.status) {
        return { status: true, data: res };
      } else {
        return { status: false, data: res.data.response.data.non_field_errors };
      }
    } catch (error) {
      return { status: false, data: res.data.response.data.non_field_errors };
    }
  };

  const createBilling = async (data) => {
    try {
      const res = await axiosPost(`${API_ROUTER.BILLING_DETAIL}`, data);

      if (res.status) {
        return { status: true, data: res };
      } else {
        return { status: false, data: res.data.response.data.non_field_errors };
      }
    } catch (error) {
      return { status: false, data: res.data.response.data.non_field_errors };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        register,
        update,
        verifyCode,
        ForgotPasswordOTP,
        ForgotPassword,
        stats,
        operationcount,
        surgeoncount,
        surgeriescount,
        surgerytypecount,
        surgerycountbymount,
        videoanalysislist,
        videoanalysislistbyId,
        addHospital,
        requestHospital,
        hospitalInvite,
        hospitalList,
        VerifyEmail,
        surgeryStats,
        acceptRequest,
        rejectRequest,
        updateHospital,
        deleteSurgeon,
        StopAnalysis,
        HospitalCount,
        Hospital,
        HospitalById,
        GetProfile,
        updateAdminProfile,
        updateHospitalProfile,
        hospitalanalysis,
        HospitalDropdown,
        hospitalstats,
        setHospital,
        updatelogo,
        hospitalId,
        hospitalcompleted,
        HospitalDatabase,
        hospitallogo,
        createhospital,
        setChange,
        change,
        getBilling,
        createBilling,
        selectedRole,
        setSelectedRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
