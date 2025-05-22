import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";
import userReducer from "../features/user/userSLice";
import cartReducer from "../features/cart/cartSlice";
import borrowReducer from "../features/borrow/BorrowSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  bookInfo: bookReducer,
  borrowInfo: borrowReducer,
  cartInfo: persistReducer(cartPersistConfig, cartReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
