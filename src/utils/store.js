import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice"
import loginReducer from "./loginSlice";
import pageReducer from "./pageSlice";
import menuReducer from "./menuSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    page:pageReducer,
    menu:menuReducer,
  },
});

export default store;
