import Expo from 'expo';
import React, { Component } from 'react';

import MyApp from './src/Routes';


const robotoThin = require('./assets/fonts/Roboto-Thin.ttf');
const openSansLight = require('./assets/fonts/OpenSans-Light.ttf');
const openSansRegular = require('./assets/fonts/OpenSans-Regular.ttf');


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
      <MyApp />
    );
  }
}
