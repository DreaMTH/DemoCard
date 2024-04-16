import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../pages/usersPage/usersSlice.js";
export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
