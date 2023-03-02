import { configureStore } from "@reduxjs/toolkit";
import shopslice from "./shop/shopslice";
const store = configureStore({
  reducer: {
    setActiveMenu: shopslice,
  },
});

export default store;
