import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name:"page",
    initialState:{},
    reducers:{
        addItem:(state,action)=>{
            Object.assign(state, action.payload);
        }
    }
});


export const { addItem,  } = pageSlice.actions;
export default pageSlice.reducer;


