import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice.js";
//importing the authRedcucer from redux to manage the loggin info of the user
import authReducer from "./features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    //registering user
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

//setup for catch listeners
setupListeners(store.dispatch);
export default store;
