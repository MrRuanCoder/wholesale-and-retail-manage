import { createSlice } from "@reduxjs/toolkit";

export const ShopKeeperSlice = createSlice({
  name: "employee",
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

export const { setAddFlag, setUpdateFlag } = ShopKeeperSlice.actions;

export const selectAddFlag = (state) => state.shopKeeper.addFlag;
export const selectUpdateFlag = (state) => state.shopKeeper.updateFlag;

export default ShopKeeperSlice.reducer;
