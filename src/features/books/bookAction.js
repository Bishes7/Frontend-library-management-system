import { fetchBookApi, getAdminBooks } from "./bookApi";

// call bookapi to post books
export const postNewBook = async (payload) => {
  const response = await fetchBookApi(payload);
};

// call bookapi to get all books
export const getAllAdminBooks = async () => {
  const response = getAdminBooks();
  console.log(response);
};
