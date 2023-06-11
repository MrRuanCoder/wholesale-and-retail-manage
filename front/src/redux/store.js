import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "./Slices/AdminSlice";
import authReducer from "./Slices/AuthSlice";
import shopKeeperReducer from "./Slices/ShopKeeperSlice.js";
import purchaserReducer from "./Slices/PurchaserSlice";

const reducers = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  shopKeeper: shopKeeperReducer,
  purchaser: purchaserReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultNormalizer) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
