import COLORS from '../themes';


const initialState = {
  color: COLORS.primary.hexCode,
};

const ChangeTheme = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      switch (action.payload) {
        case 'Home':
          return { color: COLORS.primary.hexCode };
        case 'Encoding':
          return { color: COLORS.primary.hexCode };
        case 'Decoding':
          return { color: COLORS.secondary.hexCode };
        case 'Settings':
          return { color: COLORS.tertiary.hexCode };
        case 'About':
          return { color: COLORS.quaternary.hexCode };
        case 'FAQ':
          return { color: COLORS.quinary.hexCode };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default ChangeTheme;
