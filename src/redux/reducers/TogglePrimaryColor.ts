import { isType } from "typescript-fsa";

import { PRIMARY_COLORS } from "~/common/constants";
import { PrimaryColor, PrimaryColorNames } from "~/common/interfaces";
import { togglePrimaryColor } from "~/redux/actions";

/**
 * This reducer toggles which primary colour to use.
 * Swaps the primary colour between blue and orange.
 */

const initialState = {
  colorData: PRIMARY_COLORS.BLUE
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
    const colorData =
      color === "ORANGE" ? PRIMARY_COLORS.BLUE : PRIMARY_COLORS.ORANGE;
    return { colorData };
  }
  return state;
};

export default TogglePrimaryColor;
