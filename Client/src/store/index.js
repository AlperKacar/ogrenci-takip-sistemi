import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInformation from "./userInformation";

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, userInformation);

const store = configureStore({
  reducer: {
    userInformation: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["userInformation.posts.headers"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
