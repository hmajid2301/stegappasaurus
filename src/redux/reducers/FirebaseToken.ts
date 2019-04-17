import { isType } from "typescript-fsa";

import { firebaseToken } from "~/redux/actions";

/**
 * This reducer sets the current Firebase token for auth API requests.
 */

const initialState = {
  token: ""
};

interface IAction {
  type: string;
  payload: {
    token: string;
  };
}

export interface IReducerState {
  FirebaseToken: {
    token: string;
  };
}

const FirebaseToken = (state = initialState, action: IAction) => {
  if (isType(action, firebaseToken)) {
    const { token } = action.payload;
    return { token };
  }
  return state;
};

export default FirebaseToken;
