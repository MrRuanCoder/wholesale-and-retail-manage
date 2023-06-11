import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    addFlag: false,
    updateFlag: false,
  },
  reducers: {
    setAddFlag: (state, action) => {
      state.addFlag = action.payload;
    },
    setUpdateFlag: (state, action) => {
      state.updateFlag = action.payload;
    },
  },
});

export const { setAddFlag, setUpdateFlag } = AdminSlice.actions;

export const selectAddFlag = (state) => state.admin.addFlag;
export const selectUpdateFlag = (state) => state.admin.updateFlag;

export default AdminSlice.reducer;
