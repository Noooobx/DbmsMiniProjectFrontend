import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice"
import loginReducer from "./loginSlice";
import pageReducer from "./pageSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    page:pageReducer,
  },
});

export default store;
