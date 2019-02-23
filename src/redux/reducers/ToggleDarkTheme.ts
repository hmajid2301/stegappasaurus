import { isType } from "typescript-fsa";

import { toggleDarkTheme } from "~/redux/actions";
import { THEMES } from "~/util/constants";
import { ITheme } from "~/util/interfaces";

const initialState = {
  theme: THEMES.LIGHT_THEME
};

interface IAction {
  type: string;
  isDark: boolean;
}

export interface IReducerState {
  theme: ITheme;
}

const ToggleDarkTheme = (state = initialState, action: IAction) => {
  if (isType(action, toggleDarkTheme)) {
    const { isDark } = action;
    const theme = isDark ? THEMES.LIGHT_THEME : THEMES.DARK_THEME;
    return { theme };
  }
  return state;
};

export default ToggleDarkTheme;
