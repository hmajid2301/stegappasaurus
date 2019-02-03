const initialState = {
  algorithm: 'F5',
};

const SelectAlgorithm = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ALGORITHM':
      return { algorithm: action.payload };
      
    default:
      return state;
  }
};

export default SelectAlgorithm;
