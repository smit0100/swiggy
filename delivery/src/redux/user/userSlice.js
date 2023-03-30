import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isCorierLogIn: false,
  currentColor: "slate-800",
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
    corierLogIn: (state, action) => {
      state.isCorierLogIn = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
  },
});

export const { userData, corierLogIn, setCurrentColor } = userslice.actions;
export default userslice.reducer;
