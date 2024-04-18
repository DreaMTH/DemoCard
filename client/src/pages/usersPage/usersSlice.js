import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "loading",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users = [];
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "error";
        state.users = [];
      });
  },
});
export const usersReducer = usersSlice.reducer;
