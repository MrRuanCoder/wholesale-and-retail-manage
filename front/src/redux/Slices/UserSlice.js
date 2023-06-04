import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    toggleChecked: (state, action) => {
      const { userId, checked } = action.payload;
      state.list.find((item) => item.userId === userId).checked = checked;
    },
    init: (state, action) => {
      state.list = [...action.payload];
      state.list.forEach(
        (item) => item.checked === undefined || (item.checked = false)
      );
    },
    addUser: (state, action) => {
      state.list.push({ ...action.payload });
    },
    delUser: (state, action) => {
      const { userId } = action.payload;
      state.list.splice(
        state.list.findIndex((item) => item.userId === userId),
        1
      );
    },
    updateUser: (state, action) => {
      const user = action.payload;
      state.list.every((item) => {
        if (item.userId === user.userId) {
          item = user;
          return true;
        }
        return false;
      });
    },
  },
});

export const { toggleChecked, init, addUser, delUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
