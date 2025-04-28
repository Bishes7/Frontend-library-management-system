// All API calls related to signup , login and tokens

import { apiConnector } from "./apiConnector";

const baseUrl = "http://localhost:8000";
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
