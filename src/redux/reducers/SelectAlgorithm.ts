import { isType } from "typescript-fsa";

import { selectAlgorithm } from "~/redux/actions";
import { AlgorithmNames } from "~/common/interfaces";

const initialState = {
  algorithm: "LSB-PNG"
};

interface IAction {
  type: string;
  payload: {
    algorithm: AlgorithmNames;
  };
}

export interface IReducerState {
  SelectAlgorithm: {
    algorithm: AlgorithmNames;
  };
}

const SelectAlgorithm = (state = initialState, action: IAction) => {
  if (isType(action, selectAlgorithm)) {
    const { algorithm } = action.payload;
    return { algorithm };
  }
  return state;
};

export default SelectAlgorithm;
