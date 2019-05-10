import * as React from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainApp from "~/MainApp";
import { persistor, store } from "~/redux/store";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainApp />
        </PersistGate>
      </Provider>
    );
  }

  public componentDidMount = () => {
    SplashScreen.hide();
  };
}
