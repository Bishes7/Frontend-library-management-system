import { toast } from "react-toastify";
import { fetchReviewApi, reviewApiEp } from "./reviewApi";
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
  const pending = fetchReviewApi(isAdmin);

  toast.promise(pending, { pending: "Please wait.." });

  const { status, payload, message } = await pending;
  status === "success" && dispatch(setAllReviews(payload));
};
