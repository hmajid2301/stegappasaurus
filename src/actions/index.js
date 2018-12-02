import { TOGGLE_THEME, CHANGE_THEME } from './actionTypes';


export const toggleTheme = theme => ({
  type: TOGGLE_THEME,
  payload: theme,
});

export const changeTheme = page => ({
  type: CHANGE_THEME,
  payload: page,
});
