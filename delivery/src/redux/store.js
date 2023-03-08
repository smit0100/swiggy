import { configureStore } from "@reduxjs/toolkit"
import userslice from "./user/userSlice"

 const store=configureStore({
    reducer:{
         userData: userslice,
    }
})

export default store;