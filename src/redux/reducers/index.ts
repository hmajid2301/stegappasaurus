import { combineReducers } from "redux";

import ToggleAutomaticTheme from "./ToggleAutomaticTheme";
import ToggleDarkTheme from "./ToggleDarkTheme";

const AppReducers = combineReducers({
  ToggleAutomaticTheme,
  ToggleDarkTheme
});

interface IAction {
  type: string;
}

const rootReducer = (state: any, action: IAction) => {
  return AppReducers(state, action);
};

export default rootReducer;
