import React, { Component } from "react";
import { connect } from "react-redux";

import App from "./views/Routes";

interface IState {
  theme: {
    background: string;
    color: string;
    isDark: boolean;
  };
}

class MainApp extends Component {
  public render() {
    return <App screenProps={{ theme: this.props.theme }} />;
  }
}

const mapStateToProps = (state: Types.RootState) => ({
  theme: state.ToggleDarkTheme.theme
});

export default connect(
  mapStateToProps,
  null
)(MainApp);
