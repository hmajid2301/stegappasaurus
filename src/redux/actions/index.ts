import {
  SELECT_ALGORITHM,
  TOGGLE_DARK_THEME,
  TOGGLE_PRIMARY_COLOR
} from "./actionTypes";

export const toggleDarkTheme = (theme: boolean) => ({
  payload: theme,
  type: TOGGLE_DARK_THEME
});

export const togglePrimaryColor = (color: string) => ({
  payload: color,
  type: TOGGLE_PRIMARY_COLOR
});

export const selectAlgorithm = (algorithm: string) => ({
  payload: algorithm,
  type: SELECT_ALGORITHM
});
