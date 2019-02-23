import React, { Component } from "react";

import { withTheme } from "~/redux/hoc";
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

export default withTheme(MainApp);
