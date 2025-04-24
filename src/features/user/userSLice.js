import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = userSLice;

export const { setUser } = actions;
export default reducer;
