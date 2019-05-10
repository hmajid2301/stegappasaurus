import { isType } from "typescript-fsa";

import { THEMES } from "~/constants";
import { ITheme } from "@types";
import { toggleDarkTheme } from "~/redux/actions";

/**
 * This reducer toggles whether to use the dark theme or not.
 * If set to true uses the dark theme across the app. Else
 * uses light theme. This reducer takes in true or false.
 */

const initialState = {
  theme: THEMES.LIGHT_THEME
};

interface IAction {
  type: string;
  payload: {
    isDark: boolean;
  };
}

export interface IReducerState {
  ToggleDarkTheme: {
    theme: ITheme;
  };
}

const ToggleDarkTheme = (state = initialState, action: IAction) => {
  if (isType(action, toggleDarkTheme)) {
    const { isDark } = action.payload;
    const theme = isDark ? THEMES.LIGHT_THEME : THEMES.DARK_THEME;
    return { theme };
  }
  return state;
};

export default ToggleDarkTheme;
