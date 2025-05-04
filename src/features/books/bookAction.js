import { fetchBookApi, getAdminBooks } from "./bookApi";
import { setBook } from "./bookSlice";

// call bookapi to post books
export const postNewBook = async (payload) => {
  const response = await fetchBookApi(payload);
};

// call bookapi to get all books
export const getAllAdminBooks = () => async (dispatch) => {
  const { status, payload } = await getAdminBooks();
  status === "success" && dispatch(setBook(payload));
};
