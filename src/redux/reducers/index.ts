import { combineReducers } from "redux";

import SelectAlgorithm from "./SelectAlgorithm";
import ToggleDarkTheme from "./ToggleDarkTheme";
import TogglePrimaryColor from "./TogglePrimaryColor";

export default combineReducers({
  SelectAlgorithm,
  ToggleDarkTheme,
  TogglePrimaryColor
});
