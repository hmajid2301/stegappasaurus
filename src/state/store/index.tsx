import React, { createContext } from "react";

import { PRIMARY_THEME } from "~/modules";
import { CHANGE_THEME } from "~/state/actionTypes";

export const Store = createContext(null);

const initialState = {
  theme: PRIMARY_THEME
};

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
