import { configureStore } from "@reduxjs/toolkit";
import sidebarslice from "./sidebar/sidebarSlice";
import userslice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./orders/orderSlice";
import shopslice from "./shop/shopslice";
const store = configureStore({
  reducer: {
    sidebarToggle: sidebarslice,
    userData: userslice,
    cartData: cartSlice,
    orderData: orderSlice,
    setActiveMenu: shopslice
  },
});

export default store;
