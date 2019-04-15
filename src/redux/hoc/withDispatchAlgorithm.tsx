import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AlgorithmNames } from "~/common/interfaces";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.SelectAlgorithm.algorithm
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
