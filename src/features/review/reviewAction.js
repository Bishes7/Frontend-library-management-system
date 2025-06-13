import { toast } from "react-toastify";
import { fetchReviewApi, reviewApiEp, updateReviewApi } from "./reviewApi";
import { setModalShow } from "../system/systemSlice";
import { getAllBorrows } from "../borrow/borrowAction";
import { setAllReviews } from "./reviewSlice";

export const postNewReview = (payload) => async (dispatch) => {
  const pending = reviewApiEp(payload);

  toast.promise(pending, { pending: "Please wait.." });
  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(setModalShow(false));
    dispatch(getAllBorrows());
  }
};

// fetch all reviews

export const fetchAllReviews = (isAdmin) => async (dispatch) => {
  const result = await fetchReviewApi(isAdmin);

  const { status, payload, message } = result;
  status === "success" && dispatch(setAllReviews(payload));
};

// update all reviews
export const updateSelectedReviews = (admin, payload) => async (dispatch) => {
  if (!admin) {
    return;
  }
  const result = await updateReviewApi(payload);

  const { status, message } = result;

  toast[status](message);

  if (status === "success") {
    dispatch(fetchAllReviews(admin));
  }
};
