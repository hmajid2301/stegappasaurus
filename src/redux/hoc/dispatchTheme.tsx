import { connect } from "react-redux";
import { Dispatch } from "redux";

import { toggleDarkTheme } from "~/redux/actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkTheme: (isDark: boolean) => dispatch(toggleDarkTheme({ isDark }))
});

const dispatchTheme = connect(
  null,
  mapDispatchToProps
);

export default dispatchTheme;
