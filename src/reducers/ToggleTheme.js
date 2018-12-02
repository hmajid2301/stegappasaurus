import COLORS from '../themes';


const initialState = {
  colorData: COLORS.primary,
};

const ToggleTheme = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      switch (action.payload.name) {
        case 'secondary':
          return { colorData: COLORS.primary };
        case 'primary':
          return { colorData: COLORS.secondary };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default ToggleTheme;
