import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isCorierLogIn: false,
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
  },
});

export const { userData, corierLogIn } = userslice.actions;
export default userslice.reducer;
