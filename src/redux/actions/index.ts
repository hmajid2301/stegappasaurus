import actionCreatorFactory from "typescript-fsa";

import { AlgorithmNames, PrimaryColorNames } from "~/util/interfaces";

import {
  SELECT_ALGORITHM,
  TOGGLE_DARK_THEME,
  TOGGLE_PRIMARY_COLOR
} from "./actionTypes";

const actionCreator = actionCreatorFactory();
export const toggleDarkTheme = actionCreator<{ isDark: boolean }>(
  TOGGLE_DARK_THEME
);

export const togglePrimaryColor = actionCreator<{ color: PrimaryColorNames }>(
  TOGGLE_PRIMARY_COLOR
);

export const selectAlgorithm = actionCreator<{ algorithm: AlgorithmNames }>(
  SELECT_ALGORITHM
);
