import { apiConnector } from "../../services/apiConnector";

const apiBaseUrl = import.meta.env.VITE_BASE_URl;
const reviewApi = apiBaseUrl + "/api/v1/reviews";

export const reviewApiEp = async (payload) => {
  const obj = {
    url: reviewApi,
    method: "post",
    showToast: true,
    isPrivateRoute: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};

//  fetch all reviews from the database

export const fetchReviewApi = async (admin) => {
  const path = admin ? "/admin" : "";
  const obj = {
    url: reviewApi + path,
    method: "get",
    isPrivateRoute: admin,
  };
  const result = await apiConnector(obj);
  return result;
};

// update review status API
export const updateReviewApi = async (payload) => {
  const obj = {
    url: reviewApi + "/admin",
    method: "patch",
    isPrivateRoute: true,
    payload,
  };
  const result = await apiConnector(obj);
  return result;
};
