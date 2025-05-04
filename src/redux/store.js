import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";
import userReducer from "../features/user/userSLice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
    bookInfo: bookReducer,
  },
});
