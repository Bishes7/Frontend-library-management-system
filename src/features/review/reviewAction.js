import { toast } from "react-toastify";
import { reviewApiEp } from "./reviewApi";
import { setModalShow } from "../system/systemSlice";
import { getAllBorrows } from "../borrow/borrowAction";

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
