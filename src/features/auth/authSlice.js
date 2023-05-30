import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
  admin: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.admin = undefined;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.admin = undefined;
      localStorage.clear();
    },
    adminLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = undefined;
      state.admin = action.payload.admin;
    },
    adminLoggedOut: (state) => {
      state.accessToken = undefined;
      state.admin = undefined;
      state.user = undefined;
      localStorage.clear();
    },
  },
});

export const { userLoggedIn, userLoggedOut, adminLoggedIn, adminLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
