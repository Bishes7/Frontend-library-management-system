import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URl;

const borrowApi = apiBaseUrl + "/api/v1/borrows";

export const borrowBookAPi = async (payload) => {
  const obj = {
    url: borrowApi,
    method: "post",
    showToast: false,
    isPrivateRoute: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};
