import React, { Component } from "react";
import { connect } from "react-redux";

import { IReducerState } from "~/redux/reducers/ToggleDarkTheme";
import { ITheme } from "~/util/interfaces";

import App from "./views/Routes";

interface IProps {
  theme: ITheme;
}

class MainApp extends Component<IProps, {}> {
  public render() {
    return <App screenProps={{ theme: this.props.theme }} />;
  }
}

const mapStateToProps = (state: IReducerState) => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  null
)(MainApp);
