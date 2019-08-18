import { isType } from "typescript-fsa";

import { toggleAutomaticTheme } from "~/redux/actions";

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
