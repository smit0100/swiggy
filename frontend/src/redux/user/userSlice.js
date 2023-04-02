import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    isUserLogIn: false,
    currentColor: "slate-800",
}

const userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userData: (state, action) => {
        state.user=action.payload;
       },
       userLogIn: (state, action) => {
         state.isUserLogIn = action.payload;
       },
       setCurrentColor: (state, action) => {
         state.currentColor = action.payload;
       },
    }
})

export const {userData, userLogIn, setCurrentColor}=userslice.actions;
export default userslice.reducer