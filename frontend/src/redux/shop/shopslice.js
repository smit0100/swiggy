import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    data:[],
    error:''
}
const shopslice=createSlice({
    name:"shopdata",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getdata.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getdata.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading=false;
        })
        .addCase(getdata.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
    },
});

export default shopslice.reducer;

export const getdata=createAsyncThunk('shopget/data',async ()=>{
    const data=axios.get("http://localhost:4000/product/item").then(data=>data.data).catch(error=>error)
    return data;
})
 