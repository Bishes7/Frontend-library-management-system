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

export const fetchReviewApi = async (isAdmin) => {
  const path = isAdmin ? "/admin" : "";
  const obj = {
    url: reviewApi + path,
    method: "get",
    isPrivateRoute: isAdmin,
  };
  const result = await apiConnector(obj);
  return result;
};
