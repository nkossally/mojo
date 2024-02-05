import { configureStore, combineReducers } from "@reduxjs/toolkit";
import btcReducer from "./btcSlice";
import ethReducer from "./ethSlice";
import eurReducer from "./eurSlice";
import chfReducer from "./chfSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  safelist: ["btc", "eth", "chf", "eur"]
};

const rootReducer = combineReducers({
  btc: btcReducer,
  eth: ethReducer,
  eur: eurReducer,
  chf: chfReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
