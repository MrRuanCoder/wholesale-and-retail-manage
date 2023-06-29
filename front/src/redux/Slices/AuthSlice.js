import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    role: 1,
    userId: 1,
    username: "",
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLogin = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setLoginState, setRole, setUserId, setUsername } =
  authSlice.actions;

export default authSlice.reducer;
