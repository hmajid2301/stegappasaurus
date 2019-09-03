import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  stateReconciler: autoMergeLevel2,
  storage
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
export type AppState = ReturnType<typeof rootReducer>;
