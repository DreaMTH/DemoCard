import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../pages/usersPage/usersSlice.js";
import { authReducer } from "./auth.js";
export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});
