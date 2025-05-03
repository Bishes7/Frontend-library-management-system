// call apiConnector to fetch the data

import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URl;

const bookApi = apiBaseUrl + "/api/v1/books";

// post books in db
export const fetchBookApi = async (payload) => {
  const obj = {
    url: bookApi,
    method: "post",
    showToast: true,
    isPrivateRoute: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};

// Get Admin Books

export const getAdminBooks = async () => {
  const obj = {
    url: bookApi + "/admin",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};
