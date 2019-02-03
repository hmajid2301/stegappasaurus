import { THEMES } from '~/util/constants';


const initialState = {
  theme: THEMES.LIGHT_THEME,
};

const ToggleDarkTheme = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_THEME':
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
