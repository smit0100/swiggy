import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: true,
};
const shopslice = createSlice({
  name: "shopdata",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});
export const { setActiveMenu } = shopslice.actions;
export default shopslice.reducer;
