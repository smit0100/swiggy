import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null
}

const userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userData: (state, action) => {
        state.user=action.payload;
       }
    }
})

export const {userData}=userslice.actions;
export default userslice.reducer