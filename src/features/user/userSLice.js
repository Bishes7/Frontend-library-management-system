import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  allUsers: [],
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setDeleteUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

const { reducer, actions } = userSLice;

export const { setUser, setAllUsers, setDeleteUser } = actions;
export default reducer;
