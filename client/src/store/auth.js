import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";
export const authintificationFetch = createAsyncThunk("/login", async () => {
  const data = axios.get("/users");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authintificationFetch.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(authintificationFetch.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "loaded";
      })
      .addCase(authintificationFetch.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});
export const authReducer = authSlice.reducer;
