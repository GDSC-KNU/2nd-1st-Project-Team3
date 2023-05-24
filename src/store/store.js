import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;
