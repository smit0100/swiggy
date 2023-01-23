import { configureStore } from "@reduxjs/toolkit"
import sidebarslice from "./sidebar/sidebarSlice";
import userslice from "./user/userSlice"
import cartSlice from "./cart/cartSlice";
 const store=configureStore({
    reducer:{
        sidebarToggle:sidebarslice,
         userData: userslice,
        cartData:cartSlice
    }
})

export default store;