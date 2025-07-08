import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URL;

const borrowAPi = apiBaseUrl + "/api/v1/borrows";

// for admins only
export const borrowBooksApi = async (admin) => {
  const pathUrl = admin ? "/admin" : "/user";
  const obj = {
    url: borrowAPi + pathUrl,
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// return book api
export const returnBookApi = async (payload) => {
  const obj = {
    url: borrowAPi,
    method: "patch",
    isPrivateRoute: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};

// fetch borrow stats
export const borrowStatsApi = async () => {
  const obj = {
    url: borrowAPi + "/stats/weekly",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// user weekly borrow stats
export const fetchUserWeeklyBorrStats = async () => {
  const obj = {
    url: borrowAPi + "/borrow-chart",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};
