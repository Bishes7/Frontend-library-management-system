// call apiConnector to fetch the data

import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URL;

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

// Update Books
export const updateBookApi = async (payload) => {
  const obj = {
    url: bookApi,
    method: "put",
    isPrivateRoute: true,
    showToast: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};

// Delete Books
export const deleteBookAPi = async (_id) => {
  const obj = {
    url: bookApi + "/" + _id,
    method: "delete",
    isPrivateRoute: true,
    showToast: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// Get Books for All Users

export const getBooksForAll = async () => {
  const obj = {
    url: bookApi,
    method: "get",
  };
  const result = await apiConnector(obj);
  return result;
};

// Get Only Selected Public Books
export const getSelectedBook = async (slug) => {
  const obj = {
    url: bookApi + "/public/" + slug,
    method: "get",
  };
  const result = await apiConnector(obj);
  return result;
};

// APi to fetch book chart stats
export const fetchBookCategoryStats = async () => {
  const obj = {
    url: bookApi + "/stats/categories",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};
