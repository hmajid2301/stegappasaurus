import { ITheme } from "@types";
import { isType } from "typescript-fsa";
import { DARK_THEME, PRIMARY_THEME } from "~/modules";
import { toggleDarkTheme } from "~/redux/actions";

const initialState = {
  theme: PRIMARY_THEME
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
    const theme = isDark ? DARK_THEME : PRIMARY_THEME;
    return { theme };
  }
  return state;
};

export default ToggleDarkTheme;
