import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  publicBook: [],
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
  },
});

const { reducer, actions } = bookSlice;

export const { setBook, setPublicBook } = actions;

export default reducer;
