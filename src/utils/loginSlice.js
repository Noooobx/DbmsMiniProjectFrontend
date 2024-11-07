// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "", // Add email property
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
  },
});

export const { toggleIsLoggedIn, setEmail } = loginSlice.actions;
export default loginSlice.reducer;
