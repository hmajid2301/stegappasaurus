import { connect } from "react-redux";
import { Dispatch } from "redux";

import { selectAlgorithm } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";
import { AlgorithmNames } from "~/util/interfaces";

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.algorithm
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectAlgorithm: (algorithm: AlgorithmNames) =>
    dispatch(selectAlgorithm({ algorithm }))
});

const bothAlgorithms = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default bothAlgorithms;
