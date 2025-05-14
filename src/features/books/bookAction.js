import {
  fetchBookApi,
  getAdminBooks,
  getBooksForAll,
  getSelectedBook,
} from "./bookApi";
import { setBook, setPublicBook, setSelectedBook } from "./bookSlice";

// call bookapi to post books
export const postNewBook = async (payload) => {
  const response = await fetchBookApi(payload);
};

// call bookapi to get all Admin books
export const getAllAdminBooks = () => async (dispatch) => {
  const { status, payload } = await getAdminBooks();
  status === "success" && dispatch(setBook(payload));
};

// APi Call to get books for all users
export const getAllUserBooks = () => async (dispatch) => {
  const { status, payload } = await getBooksForAll();
  status === "success" && dispatch(setPublicBook(payload));
};

// API call to get only selected books
export const getOnlySelectedBook = (slug) => async (dispatch) => {
  const { status, payload } = await getSelectedBook(slug);
  status === "success" && dispatch(setSelectedBook(payload));
};
