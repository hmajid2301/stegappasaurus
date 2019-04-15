import { connect } from "react-redux";
import { Dispatch } from "redux";

import { PrimaryColorNames } from "~/common/interfaces";
import { togglePrimaryColor } from "~/redux/actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePrimaryColor: (colorName: PrimaryColorNames) =>
    dispatch(togglePrimaryColor({ color: colorName }))
});

const dispatchPrimaryColor = connect(
  null,
  mapDispatchToProps
);

export default dispatchPrimaryColor;
