import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import MyApp from './src/Routes';


const robotoThin = require('./src/assets/fonts/Roboto-Thin.ttf');
const openSansLight = require('./src/assets/fonts/OpenSans-Light.ttf');
const openSansRegular = require('./src/assets/fonts/OpenSans-Regular.ttf');


export default class App extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      RobotoThin: robotoThin,
      OpenSansLight: openSansLight,
      OpenSansRegular: openSansRegular,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
