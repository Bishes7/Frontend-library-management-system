import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allBorrows: [], // for admin
  myBorrows: [], // for users
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    setAllBorrow: (state, { payload }) => {
      state.allBorrows = payload;
    },

    setMyBorrows: (state, { payload }) => {
      state.myBorrows = payload;
    },
  },
});

const { reducer, actions } = borrowSlice;

export const { setAllBorrow, setMyBorrows } = actions;

export default reducer;
