import { borrowBooksApi } from "./borrowApi";
import { setAllBorrow } from "./BorrowSlice";

export const getAllBorrows = () => async (dispatch) => {
  const { payload, status, message } = await borrowBooksApi();
  dispatch(setAllBorrow(payload));
};
