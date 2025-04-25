import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSLice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
  },
});
