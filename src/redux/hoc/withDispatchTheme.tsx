import { connect } from "react-redux";
import { Dispatch } from "redux";

import { toggleDarkTheme } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/ToggleDarkTheme";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkTheme: (isDark: boolean) => dispatch(toggleDarkTheme({ isDark }))
});

const mapStateToProps = (state: IReducerState) => ({
  theme: state.ToggleDarkTheme.theme
});

const withDispatchTheme = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withDispatchTheme;
