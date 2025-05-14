import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  publicBook: [],
  selectedBook: {},
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

    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload || {};
    },
  },
});

const { reducer, actions } = bookSlice;

export const { setBook, setPublicBook, setSelectedBook } = actions;

export default reducer;
