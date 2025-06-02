import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShow: false,
  modalContent: {
    title: "Review",
    content: "Awesome BOok",
  },
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setModalShow: (state, { payload }) => {
      state.modalShow = payload;
    },

    setModalContent: (state, { payload }) => {
      state.modalContent = payload;
    },
  },
});

const { reducer, actions } = systemSlice;
export const { setModalShow, setModalContent } = actions;

export default reducer;
