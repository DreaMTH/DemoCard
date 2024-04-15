import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "loading",
  },
  reducers: {},
});
export const usersReducer = usersSlice.reducer;
