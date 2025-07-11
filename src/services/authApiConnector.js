// All API calls related to signup , login and tokens

import { apiConnector } from "./apiConnector";

const baseUrl = import.meta.env.VITE_BASE_URL;

const authApi = baseUrl + "/api/v1/auth";

// Sign Up API
export const signUpApi = async (payload) => {
  const obj = {
    url: authApi + "/register",
    method: "post",
    payload,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// Activate new User API

export const activateUserApi = async (payload) => {
  const obj = {
    method: "post",
    url: authApi + "/activate-user",
    payload,
  };
  return apiConnector(obj);
};

// Log IN User

export const logInUser = async (payload) => {
  const obj = {
    method: "post",
    url: authApi + "/login",
    payload,
    showToast: true,
  };

  return apiConnector(obj);
};

// Request new accessJWT

export const getaccessJWT = async () => {
  const obj = {
    method: "get",
    url: authApi + "/renew-jwt",
    isPrivateRoute: true,
    isRefreshJWT: true,
  };
  return apiConnector(obj);
};

// logout user
export const logOutAPI = async () => {
  const obj = {
    url: authApi + "/logout",
    method: "get",
    isPrivateRoute: true,
  };
  return apiConnector(obj);
};

// Password- Reset
export const passwordReset = async (payload) => {
  const obj = {
    url: authApi + "/psw-reset",
    method: "post",
    payload,
  };
  return apiConnector(obj);
};

// Update password reset
export const UpdatePassword = async (payload) => {
  const obj = {
    url: authApi + "/update-password",
    method: "post",
    payload,
    showToast: true,
  };
  return apiConnector(obj);
};

// Change password Api
export const changePasswordApi = async (payload) => {
  const obj = {
    url: authApi + "/change-password",
    method: "patch",
    payload,
    isPrivateRoute: true,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};
