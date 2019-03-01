import { connect } from "react-redux";

import { IReducerState } from "~/redux/reducers/TogglePrimaryColor";

const mapStateToProps = (state: IReducerState) => ({
  primaryColor: state.TogglePrimaryColor.colorData.color
});
const withPrimaryColor = connect(
  mapStateToProps,
  null
);

export default withPrimaryColor;
