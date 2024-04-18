import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";
export const authintificationFetch = createAsyncThunk(
  "auth/login",
  async (params) => {
    const { data } = await axios.post("auth/login", params);
    return data;
  },
);
export const authMeFetch = createAsyncThunk("auth/me", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});
const initialState = {
  data: null,
  status: "loading",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authintificationFetch.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(authintificationFetch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(authintificationFetch.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(authMeFetch.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(authMeFetch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(authMeFetch.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});
export const authReducer = authSlice.reducer;
export const isAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
