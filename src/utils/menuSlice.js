import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name:"menu",
    initialState : [],
    reducers : {
        addSearchInfo:(state,action)=>{
            state.push(action.payload);
            //Object.assign(state, action.payload);
        }
    }
});
export const {addSearchInfo} = menuSlice.actions;
export default menuSlice.reducer;
