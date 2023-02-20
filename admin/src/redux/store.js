import { configureStore } from "@reduxjs/toolkit"
import sidebarslice from "./sidebar/sidebarSlice";
import userslice from "./user/userSlice"
import cartSlice from "./cart/cartSlice";
import orderSlice from "./orders/orderSlice";
 const store=configureStore({
    reducer:{
        sidebarToggle:sidebarslice,
         userData: userslice,
        cartData:cartSlice,
        orderData:orderSlice
    }
})

export default store;