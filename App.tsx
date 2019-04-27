import { AppLoading, Font } from "expo";
import { Root } from "native-base";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainApp from "~/MainApp";
import { persistor, store } from "~/redux/store";

const Roboto = require("native-base/Fonts/Roboto.ttf");
const RobotoLight = require("~/assets/fonts/Roboto-Light.ttf");
const Roboto_medium = require("native-base/Fonts/Roboto_medium.ttf");
const RobotoThin = require("~/assets/fonts/Roboto-Thin.ttf");

interface IState {
  loading: boolean;
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { loading: true };
  }

  public componentWillMount = async () => {
    await Font.loadAsync({
      Roboto,
      RobotoLight,
      RobotoThin,
      Roboto_medium
    });
    this.setState({ loading: false });
  };

  public render() {
    if (this.state.loading) {
      return <AppLoading startAsync={null} onError={null} onFinish={null} />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <MainApp />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
