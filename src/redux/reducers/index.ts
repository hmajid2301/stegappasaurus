import { combineReducers } from "redux";
import storage from "redux-persist/es/storage";
import { isType } from "typescript-fsa";

import { resetPreferences } from "../actions";
import ToggleAutomaticTheme from "./ToggleAutomaticTheme";
import ToggleDarkTheme from "./ToggleDarkTheme";
import TogglePrimaryColor from "./TogglePrimaryColor";

const AppReducers = combineReducers({
  ToggleAutomaticTheme,
  ToggleDarkTheme,
  TogglePrimaryColor
});

interface IAction {
  type: string;
}

const rootReducer = (state: any, action: IAction) => {
  if (isType(action, resetPreferences)) {
    Object.keys(state).forEach(async key => {
      await storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }
  return AppReducers(state, action);
};

export default rootReducer;
