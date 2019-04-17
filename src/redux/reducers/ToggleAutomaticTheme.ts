import { isType } from "typescript-fsa";

import { toggleAutomaticTheme } from "~/redux/actions";

/**
 * This reducer toggles whether to use an automatic dark/light theme.
 * This reducer takes in true/false and sets that whether to use an
 * automatic theme or not.
 */

const initialState = {
  isAutomatic: false
};

interface IAction {
  type: string;
  payload: {
    isAutomatic: boolean;
  };
}

export interface IReducerState {
  ToggleAutomaticTheme: {
    isAutomatic: boolean;
  };
}

const ToggleAutomaticTheme = (state = initialState, action: IAction) => {
  if (isType(action, toggleAutomaticTheme)) {
    const { isAutomatic } = action.payload;
    return { isAutomatic };
  }
  return state;
};

export default ToggleAutomaticTheme;
