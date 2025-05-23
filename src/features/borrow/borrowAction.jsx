import { borrowBooksApi } from "./borrowApi";
import { setAllBorrow, setMyBorrows } from "./BorrowSlice";

export const getAllBorrows = (admin) => async (dispatch) => {
  const { payload, status, message } = await borrowBooksApi(admin);

  admin ? dispatch(setAllBorrow(payload)) : dispatch(setMyBorrows(payload));
};
