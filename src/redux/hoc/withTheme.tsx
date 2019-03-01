import { connect } from "react-redux";

import { IReducerState } from "~/redux/reducers/ToggleDarkTheme";

const mapStateToProps = (state: IReducerState) => ({
  theme: state.ToggleDarkTheme.theme
});
const withTheme = connect(
  mapStateToProps,
  null
);

export default withTheme;
