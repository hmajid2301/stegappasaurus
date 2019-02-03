import { Font, AppLoading } from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from '~/redux/store';
import MainApp from '~/MainApp';


const RobotoThin = require('~/assets/fonts/Roboto-Thin.ttf');
const RobotoLight = require('~/assets/fonts/Roboto-Light.ttf');
const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      RobotoThin,
      RobotoLight,
      Roboto,
      Roboto_medium: RobotoMedium,
    });

    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading/>;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainApp/>
        </PersistGate>
      </Provider>
    );
  }
}
