import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isOwnerLogIn: false,
  currentColor: "slate-800",
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
    ownerLogIn: (state, action) => {
      state.isOwnerLogIn = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
  },
});

export const { userData, ownerLogIn, setCurrentColor } = userslice.actions;
export default userslice.reducer;
