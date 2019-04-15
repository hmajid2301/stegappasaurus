import { AppLoading, Font } from "expo";
import { Root } from "native-base";
import React, { Component } from "react";
import env from "react-native-dotenv";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Sentry from "sentry-expo";

import MainApp from "~/MainApp";
import { persistor, store } from "~/redux/store";

const RobotoThin = require("~/assets/fonts/Roboto-Thin.ttf");
const RobotoLight = require("~/assets/fonts/Roboto-Light.ttf");
const Roboto = require("native-base/Fonts/Roboto.ttf");
const RobotoMedium = require("native-base/Fonts/Roboto_medium.ttf");

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
      Roboto_medium: RobotoMedium
    });
    this.setState({ loading: false });
    Sentry.enableInExpoDevelopment = true;
    await Sentry.config(env.SENTRY_PUBLIC_DSN).install();
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
