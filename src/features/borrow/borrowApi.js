import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URl;

const borrowAPi = apiBaseUrl + "/api/v1/borrows";

export const borrowBooksApi = async () => {
  const obj = {
    url: borrowAPi + "/admin",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};
