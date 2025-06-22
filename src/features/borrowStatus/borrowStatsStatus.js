import { apiConnector } from "../../services/apiConnector";

const borrowStatsAPi = "/api/stats";
// api to fetch borrow chart status
export const fetchborrowChartStatus = async () => {
  const obj = {
    url: borrowStatsAPi + "/borrow-status",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};

// api to fetch recent books for chart
export const getRecentBooksApi = async () => {
  const obj = {
    url: borrowStatsAPi + "/recent-books",
    method: "get",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);

  return result;
};

// api to fetch dashboard stats
export const fetchDashboardStats = async () => {
  const obj = {
    url: borrowStatsAPi + "/dashboard-stats",
    isPrivateRoute: true,
  };
  const result = await apiConnector(obj);
  return result;
};
