import { isType } from "typescript-fsa";

import { selectAlgorithm } from "~/redux/actions";
import { AlgorithmNames } from "~/util/interfaces";

const initialState = {
  algorithm: "F5"
};

interface IAction {
  type: string;
  algorithm: string;
}

export interface IReducerState {
  algorithm: AlgorithmNames;
}

const SelectAlgorithm = (state = initialState, action: IAction) => {
  if (isType(action, selectAlgorithm)) {
    const { algorithm } = action;
    return { algorithm };
  }
  return state;
};

export default SelectAlgorithm;
