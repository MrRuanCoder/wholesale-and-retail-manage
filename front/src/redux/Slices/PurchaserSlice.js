import { createSlice } from "@reduxjs/toolkit";

export const SupplierSlice = createSlice({
  name: "supplier",
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

export const { setAddFlag, setUpdateFlag } = SupplierSlice.actions;

export const selectAddFlag = (state) => state.purchaser.addFlag;
export const selectUpdateFlag = (state) => state.purchaser.updateFlag;

export default SupplierSlice.reducer;
