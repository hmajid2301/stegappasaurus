import { PRIMARY_COLORS } from '../util/constants';


const initialState = {
  colorData: PRIMARY_COLORS.blue,
};

const ChangePrimaryColor = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PRIMARY_COLOR':
      switch (action.payload.name) {
        case 'orange':
          return { colorData: PRIMARY_COLORS.blue };
        case 'blue':
          return { colorData: PRIMARY_COLORS.orange };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default ChangePrimaryColor;
