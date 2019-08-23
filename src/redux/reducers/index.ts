import { combineReducers } from "redux";

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
  return AppReducers(state, action);
};

export default rootReducer;
