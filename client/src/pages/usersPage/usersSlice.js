import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchUsers = createAsyncThunk("/users", async () => {
  const { data } = axios.get("/users");
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "loading",
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.users = [];
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "ready";
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.users = [];
    },
  },
});
export const usersReducer = usersSlice.reducer;
