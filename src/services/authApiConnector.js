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
  console.log(result);
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
