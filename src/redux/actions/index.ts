import actionCreatorFactory from "typescript-fsa";

import { TOGGLE_AUTOMATIC_THEME, TOGGLE_DARK_THEME } from "./actionTypes";

const actionCreator = actionCreatorFactory();

export const toggleAutomaticTheme = actionCreator<{
  isAutomatic: boolean;
}>(TOGGLE_AUTOMATIC_THEME);

export const toggleDarkTheme = actionCreator<{ isDark: boolean }>(
  TOGGLE_DARK_THEME
);
