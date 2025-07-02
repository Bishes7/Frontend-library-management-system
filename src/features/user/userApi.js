import { apiConnector } from "../../services/apiConnector";

// call apiConnector to fetch the data
const apiBaseUrl = import.meta.env.VITE_BASE_URl;
const userApi = apiBaseUrl + "/api/v1/user";

export const fetchUserApi = async () => {
  const obj = {
    url: userApi + "/profile",
    method: "get",
    showToast: false,
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);

  return result;
};

// fetch weekly user stats
export const fetchWeeklyUserStats = async () => {
  const obj = {
    url: userApi + "/stats/weekly",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// get all users

export const fetchAllUsersApi = async () => {
  const obj = {
    url: userApi + "/all-users",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

//  Delete Selected Users
export const deleteUserApi = async (id) => {
  const obj = {
    url: `${userApi}/${id}`,
    method: "delete",
    isPrivateRoute: true,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// update user status
export const updateUserStatusAPi = async (id) => {
  const obj = {
    url: `${userApi}/status/${id}`,
    method: "patch",
    isPrivateRoute: true,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// Update User Role
export const updateUserRoleApi = async (id) => {
  const obj = {
    url: `${userApi}/role/${id}`,
    method: "patch",
    isPrivateRoute: true,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// get Single User
export const getUserProfileApi = async (id) => {
  const obj = {
    method: "get",
    url: `${userApi}/${id}`,
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// upload profile image
export const uploadProfileImageApi = async (payload) => {
  const obj = {
    method: "patch",
    url: userApi + "/upload-profile",
    isPrivateRoute: true,
    showToast: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};
