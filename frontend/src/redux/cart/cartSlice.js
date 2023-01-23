import {createSlice} from "@reduxjs/toolkit"

const initialState={
    cart:null
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        cartData: (state, action) => {
        state.cart=action.payload;
       }
    }
})

export const {cartData}=cartSlice.actions;
export default cartSlice.reducer