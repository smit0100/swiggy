import {createSlice} from "@reduxjs/toolkit"

const initialState={
    orders:null
}

const orderSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{
        ordersData: (state, action) => {
        state.orders=action.payload;
       }
    }
})

export const {ordersData}=orderSlice.actions;
export default orderSlice.reducer