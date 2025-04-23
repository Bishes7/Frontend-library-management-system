import { apiConnector } from "../../services/apiConnector";

// call apiConnector to fetch the data
const apiBaseUrl = "http://localhost:8000";
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
