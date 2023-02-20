import {createSlice} from "@reduxjs/toolkit"

const initialState={
    sidebar:false
}

const sidebarslice=createSlice({
    name:"sidebar",
    initialState,
    reducers:{
       sidebarToggle:(state)=>{
        state.sidebar=!state.sidebar;
       }
    }
})

export const {sidebarToggle}=sidebarslice.actions;
export default sidebarslice.reducer