import { PRIMARY_COLORS } from '~/util/constants';


const initialState = {
  colorData: PRIMARY_COLORS.BLUE,
};

const TogglePrimaryColor = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_PRIMARY_COLOR':
      switch (action.payload) {
        case 'ORANGE':
          return { colorData: PRIMARY_COLORS.BLUE };

        case 'BLUE':
          return { colorData: PRIMARY_COLORS.ORANGE };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default TogglePrimaryColor;
