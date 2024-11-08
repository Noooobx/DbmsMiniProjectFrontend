// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "", // Email property
  user_id: null, // user_id property added
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toggleIsLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setEmail: (state, action) => {
      state.email = action.payload; // Set the email from action payload
    },
    setUserId: (state, action) => {
      state.user_id = action.payload; // Set the user_id from action payload
    },
  },
});

export const { toggleIsLoggedIn, setEmail, setUserId } = loginSlice.actions;
export default loginSlice.reducer;
