import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import rootReducer from "../reducers";

const persistConfig = {
  blacklist: ["TogglePrimaryColor"],
  key: "root",
  stateReconciler: autoMergeLevel2,
  storage,
  whitelist: ["SelectAlgorithm", "ToggleDarkTheme"]
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
