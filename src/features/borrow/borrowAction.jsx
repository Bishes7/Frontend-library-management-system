import { toast } from "react-toastify";
import { borrowBooksApi, returnBookApi } from "./borrowApi";
import { setAllBorrow, setMyBorrows } from "./BorrowSlice";

export const getAllBorrows = (admin) => async (dispatch) => {
  const { payload, status, message } = await borrowBooksApi(admin);

  admin ? dispatch(setAllBorrow(payload)) : dispatch(setMyBorrows(payload));
};

// update book action

export const returnBookACtion = (payload) => async (dispatch) => {
  const pending = returnBookApi(payload);

  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, message } = await pending;
  toast[status](message);

  status === "success" && dispatch(getAllBorrows());
};
