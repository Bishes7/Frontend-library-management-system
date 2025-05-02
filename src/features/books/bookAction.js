import { fetchBookApi } from "./bookApi";

// call book api to get data
export const postNewBook = async (payload) => {
  const response = await fetchBookApi(payload);
};
