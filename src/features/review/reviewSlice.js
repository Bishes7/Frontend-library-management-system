import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setAllReviews: (state, { payload }) => {
      state.reviews = payload;
    },
  },
});

const { reducer, actions } = reviewSlice;

export const { setAllReviews } = actions;
export default reducer;
