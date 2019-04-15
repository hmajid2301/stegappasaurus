import actionCreatorFactory from "typescript-fsa";

import { AlgorithmNames, PrimaryColorNames } from "~/common/interfaces";

import {
  RESET_PREFERENCES,
  SELECT_ALGORITHM,
  TOGGLE_AUTOMATIC,
  TOGGLE_DARK_THEME,
  TOGGLE_PRIMARY_COLOR
} from "./actionTypes";
import { ReadStream } from "fs";

const actionCreator = actionCreatorFactory();

export const resetPreferences = actionCreator<{}>(RESET_PREFERENCES);

export const selectAlgorithm = actionCreator<{ algorithm: AlgorithmNames }>(
  SELECT_ALGORITHM
);

export const toggleAutomaticTheme = actionCreator<{
  isAutomatic: boolean;
}>(TOGGLE_AUTOMATIC);

export const toggleDarkTheme = actionCreator<{ isDark: boolean }>(
  TOGGLE_DARK_THEME
);

export const togglePrimaryColor = actionCreator<{ color: PrimaryColorNames }>(
  TOGGLE_PRIMARY_COLOR
);
