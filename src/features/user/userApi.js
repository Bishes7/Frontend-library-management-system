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
  console.log(result);
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
