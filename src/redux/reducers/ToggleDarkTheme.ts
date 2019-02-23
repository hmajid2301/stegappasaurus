import { THEMES } from "~/util/constants";

const initialState = {
  theme: THEMES.LIGHT_THEME
};

interface IAction {
  type: string;
  payload: boolean;
}

export interface IReducerState {
  theme: {
    background: "000" | "#FFF";
    color: "#17212D" | "#FFF";
    isDark: boolean;
  };
}

const ToggleDarkTheme = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "TOGGLE_DARK_THEME":
      switch (action.payload) {
        case false:
          return { theme: THEMES.DARK_THEME };

        case true:
          return { theme: THEMES.LIGHT_THEME };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default ToggleDarkTheme;
