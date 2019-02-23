const initialState = {
  algorithm: "F5"
};

interface IAction {
  type: string;
  payload: string;
}

export interface IReducerState {
  algorithm: "F5" | "LSB-PNG" | "LSB-DCT";
}

const SelectAlgorithm = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "SELECT_ALGORITHM":
      return { algorithm: action.payload };

    default:
      return state;
  }
};

export default SelectAlgorithm;
