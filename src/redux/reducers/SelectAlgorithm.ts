import { isType } from "typescript-fsa";

import { AlgorithmNames } from "@types";
import { selectAlgorithm } from "~/redux/actions";

/**
 * This reducer sets the algorithm to use for encoding/decoding.
 * This reducer takes in the new algorithm names and sets it as
 * the new algorithm.
 */

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
