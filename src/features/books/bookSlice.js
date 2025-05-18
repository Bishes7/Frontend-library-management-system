import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  publicBook: [],
  selectedBook: {},
  cartItem: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },

    setPublicBook: (state, action) => {
      state.publicBook = action.payload;
    },

    setSelectedBook: (state, { payload }) => {
      state.selectedBook = payload || {};
    },
    setCartItem: (state, { payload }) => {
      state.cartItem = [...state.cartItem, payload];
    },

    removeFromCart: (state, { payload }) => {
      state.cartItem = state.cartItem.filter((book) => !book._id === payload);
    },
  },
});

const { reducer, actions } = bookSlice;

export const {
  setBook,
  setPublicBook,
  setSelectedBook,
  setCartItem,
  removeFromCart,
} = actions;

export default reducer;
