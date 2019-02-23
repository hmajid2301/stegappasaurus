import { isType } from "typescript-fsa";

import { togglePrimaryColor } from "~/redux/actions";
import { PRIMARY_COLORS } from "~/util/constants";
import { PrimaryColor } from "~/util/interfaces";

const initialState = {
  colorData: PRIMARY_COLORS.BLUE
};

interface IAction {
  type: string;
  color: string;
}

export interface IReducerState {
  colorData: {
    name: "BLUE" | "ORANGE";
    color: PrimaryColor;
  };
}

const TogglePrimaryColor = (state = initialState, action: IAction) => {
  if (isType(action, togglePrimaryColor)) {
    const { color } = action;
    const colorData =
      color === "ORANGE" ? PRIMARY_COLORS.BLUE : PRIMARY_COLORS.ORANGE;
    return { colorData };
  }
  return state;
};

export default TogglePrimaryColor;
