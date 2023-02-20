import { configureStore } from "@reduxjs/toolkit"
import sidebarslice from "./sidebar/sidebarSlice";
import userslice from "./user/userSlice"

 const store=configureStore({
    reducer:{
        sidebarToggle:sidebarslice,
         userData: userslice,
    }
})

export default store;