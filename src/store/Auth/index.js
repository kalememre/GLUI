// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Utils
import axiosInstance from "../axiosDefault";

// ** Login
export const authLogin = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// ** register
export const authRegister = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const appAuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    authLoading: false,
    authError: "",
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.authLoading = false;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.authError = action.error.message;
      state.authLoading = false;
    });

    builder.addCase(authRegister.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.authLoading = false;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(authRegister.rejected, (state, action) => {
      state.authError = action.error.message;
      state.authLoading = false;
    });
  },
});

export const { logout } = appAuthSlice.actions;

export default appAuthSlice.reducer;
