import actionCreatorFactory from "typescript-fsa";

import { PrimaryColorNames } from "@types";

import {
  RESET_PREFERENCES,
  TOGGLE_AUTOMATIC_THEME,
  TOGGLE_DARK_THEME,
  TOGGLE_PRIMARY_COLOR
} from "./actionTypes";

const actionCreator = actionCreatorFactory();

export const resetPreferences = actionCreator<{}>(RESET_PREFERENCES);

export const toggleAutomaticTheme = actionCreator<{
  isAutomatic: boolean;
}>(TOGGLE_AUTOMATIC_THEME);

export const toggleDarkTheme = actionCreator<{ isDark: boolean }>(
  TOGGLE_DARK_THEME
);

export const togglePrimaryColor = actionCreator<{ color: PrimaryColorNames }>(
  TOGGLE_PRIMARY_COLOR
);
