import { connect } from "react-redux";
import { Dispatch } from "redux";

import { togglePrimaryColor } from "~/redux/actions";
import { PrimaryColorNames } from "~/util/interfaces";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePrimaryColor: (colorName: PrimaryColorNames) =>
    dispatch(togglePrimaryColor({ color: colorName }))
});

const dispatchPrimaryColor = connect(
  null,
  mapDispatchToProps
);

export default dispatchPrimaryColor;
