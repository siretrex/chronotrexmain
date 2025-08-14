import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

const storedUser = JSON.parse(localStorage.getItem("userData"));

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: storedUser || undefined, 
  },
});
