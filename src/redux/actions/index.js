import { TOGGLE_PRIMARY_COLOR, SELECT_ALGORITHM, TOGGLE_DARK_THEME } from './actionTypes';


export const toggleDarkTheme = theme => ({
  type: TOGGLE_DARK_THEME,
  payload: theme,
});

export const togglePrimaryColor = color => ({
  type: TOGGLE_PRIMARY_COLOR,
  payload: color,
});

export const selectAlgorithm = algorithm => ({
  type: SELECT_ALGORITHM,
  payload: algorithm,
});
