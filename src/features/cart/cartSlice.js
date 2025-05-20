import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCartItem: (state, { payload }) => {
      state.cartItem = [...state.cartItem, payload];
    },

    resetCartItem: (state, { payload }) => {
      state.cartItem = [];
    },

    removeFromCart: (state, { payload }) => {
      state.cartItem = state.cartItem.filter((book) => !book._id === payload);
    },
  },
});

const { reducer, actions } = bookSlice;

export const { setCartItem, removeFromCart, resetCartItem } = actions;

export default reducer;
