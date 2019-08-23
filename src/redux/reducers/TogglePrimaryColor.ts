import { PrimaryColor, PrimaryColorNames } from "@types";
import { isType } from "typescript-fsa";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "~/modules";
import { togglePrimaryColor } from "~/redux/actions";

const initialState = {
  colorData: PRIMARY_COLOR
};

interface IAction {
  type: string;
  payload: {
    color: PrimaryColorNames;
  };
}

export interface IReducerState {
  TogglePrimaryColor: {
    colorData: {
      name: "BLUE" | "ORANGE";
      color: PrimaryColor;
    };
  };
}

const TogglePrimaryColor = (state = initialState, action: IAction) => {
  if (isType(action, togglePrimaryColor)) {
    const { color } = action.payload;
    const colorData = color === "ORANGE" ? SECONDARY_COLOR : PRIMARY_COLOR;
    return { colorData };
  }
  return state;
};

export default TogglePrimaryColor;
