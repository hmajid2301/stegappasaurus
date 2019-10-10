import { DARK_THEME, PRIMARY_THEME } from "~/modules";
import { CHANGE_THEME } from "./actionTypes";

export const changeTheme = (isDark, dispatch) => {
  const dispatchObj = {
    payload: isDark ? DARK_THEME : PRIMARY_THEME,
    type: CHANGE_THEME
  };
  return dispatch(dispatchObj);
};
