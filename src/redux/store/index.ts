import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";

import rootReducer from "../reducers";

const persistConfig = {
  blacklist: ["TogglePrimaryColor"],
  key: "root",
  stateReconciler: autoMergeLevel2,
  storage,
  whitelist: ["SelectAlgorithm", "ToggleAutomaticTheme", "ToggleDarkTheme"]
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
export type AppState = ReturnType<typeof rootReducer>;
