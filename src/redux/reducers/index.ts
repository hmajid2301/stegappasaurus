import { combineReducers } from "redux";

import SelectAlgorithm from "./SelectAlgorithm";
import ToggleAutomaticTheme from "./ToggleAutomaticTheme";
import ToggleDarkTheme from "./ToggleDarkTheme";
import TogglePrimaryColor from "./TogglePrimaryColor";

export default combineReducers({
  SelectAlgorithm,
  ToggleAutomaticTheme,
  ToggleDarkTheme,
  TogglePrimaryColor
});
