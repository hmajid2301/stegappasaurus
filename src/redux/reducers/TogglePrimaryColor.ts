import { PRIMARY_COLORS } from "~/util/constants";

const initialState = {
  colorData: PRIMARY_COLORS.BLUE
};

interface IAction {
  type: string;
  payload: string;
}

export interface IReducerState {
  colorData: {
    name: "BLUE" | "ORANGE";
    color: "#009CFF" | "#E88C0C";
  };
}

const TogglePrimaryColor = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "TOGGLE_PRIMARY_COLOR":
      switch (action.payload) {
        case "ORANGE":
          return { colorData: PRIMARY_COLORS.BLUE };

        case "BLUE":
          return { colorData: PRIMARY_COLORS.ORANGE };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default TogglePrimaryColor;
