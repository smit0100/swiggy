import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isOwnerLogIn: false,
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
  },
});

export const { userData, ownerLogIn } = userslice.actions;
export default userslice.reducer;